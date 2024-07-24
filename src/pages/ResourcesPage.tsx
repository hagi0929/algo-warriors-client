import React, { useState, useEffect } from 'react';
import { fetchResources, searchResources } from '../api/popupResourcesApi';
import { Resource } from '../models/Resource';
import { Badge } from "../components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "../components/ui/pagination";
import { Button } from "../components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../components/ui/dropdown-menu";
import '../styles/resources.css';
import Navbar from '../components/Navbar';

interface DropDownForm {
  value: string;
  label: string;
}

const topics: DropDownForm[] = [
  { value: "machine_learning", label: "Machine Learning" },
  { value: "react", label: "React" },
  { value: "python", label: "Python" },
  { value: "javascript", label: "JavaScript" },
];

const ResourcesPage: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [filteredResources, setFilteredResources] = useState<Resource[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const resourcesPerPage = 10;
  
  const parseTopics = (topicsString: string) => {
    return topicsString
      .replace(/^\[|\]$/g, '') // Remove leading and trailing brackets
      .replace(/'/g, '') // Remove single quotes
      .split(',') // Split by comma
      .map(topic => topic.trim()); // Trim whitespace
  };
  
  // Get all resources
  useEffect(() => {
    const loadResources = async () => {
      try {
        const fetchedResources = await fetchResources();
        setResources(fetchedResources);
        setFilteredResources(fetchedResources);
      } catch (error) {
        setError('Failed to fetch resources.');
      }
    };
    loadResources();
  }, []);
  
  // Search resources
  useEffect(() => {
    const search = async () => {
      if (searchTerm) {
        try {
          const searchedResources = await searchResources(searchTerm);
          setFilteredResources(searchedResources);
        } catch (error) {
          setError('Failed to search resources.');
        }
      } else if (selectedTopic) {
        const filtered = resources.filter(resource =>
          resource.topics.includes(selectedTopic)
        );
        setFilteredResources(filtered);
      } else {
        setFilteredResources(resources);
      }
    };
    search();
  }, [searchTerm, selectedTopic, resources]);

  const handleTopicChange = (value: string) => {
    setSelectedTopic(value);
    setSearchTerm('');
  };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const indexOfLastResource = currentPage * resourcesPerPage;
  const indexOfFirstResource = indexOfLastResource - resourcesPerPage;
  const currentResources = filteredResources.slice(indexOfFirstResource, indexOfLastResource);

  if (error) return <div>{error}</div>;
  // Pagination window logic
  const totalPages = Math.ceil(filteredResources.length / resourcesPerPage);
  const maxVisiblePages = 3;
  let startPage = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 1);
  let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

  if (endPage - startPage + 1 < maxVisiblePages && startPage > 1) {
    startPage = Math.max(endPage - maxVisiblePages + 1, 1);
  }


  return (
    <>
      <Navbar/>
      <div className="resources-page">
        <Card className="resource-card">
          <CardHeader className="px-7">
            <CardTitle>Resources</CardTitle>
            <CardDescription>
              Popup Resources in AlgoWarrior are curated links to the all-time most popular coding resources and GitHub repositories on the internet, aimed at providing users with valuable tools and learning materials. The resources are handpicked to cover several topics ranging from machine learning to React, and they cater to all levels of users from bare beginners to seasoned coders. We are using the Kaggle database consisting of 215,000 resources ordered by their popularity.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="resource-controls">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    {selectedTopic ? topics.find(topic => topic.value === selectedTopic)?.label : 'Select Topic'}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Available Topics</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup value={selectedTopic} onValueChange={handleTopicChange}>
                    {topics.map(topic => (
                      <DropdownMenuRadioItem key={topic.value} value={topic.value}>
                        {topic.label}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>

              <div className="search-container">
                <input
                  type="text"
                  placeholder="Search resources..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>
            </div>

            <Table>
            <TableHeader>
              <TableRow>
                <TableHead className='w-1/6 max-w-[200px]'>Name</TableHead>
                <TableHead className='w-1/6 max-w-[200px]'>Description</TableHead>
                <TableHead className='w-1/6 max-w-[200px]'>Links</TableHead>
                <TableHead className='w-1/2 max-w-[200px]'>Topics</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentResources.map(resource => (
                <TableRow key={resource.resource_id} className="bg-accent hover:bg-hover-accent">
                  <TableCell className="truncate max-w-[200px]">{resource.resource_name}</TableCell>
                  <TableCell className="truncate max-w-[200px]">{resource.resource_description}</TableCell>
                  <TableCell className="max-w-[200px]">
                    <a href={resource.resource_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                      View Repo
                    </a>
                    {' | '}
                    <a href={resource.homepage} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                      View Website
                    </a>
                  </TableCell>
                  <TableCell className="max-w-[200px]">
                    <div className="tags">
                      {parseTopics(resource.topics).map((topic, index) => (
                        <Badge key={index} className="tag">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            </Table>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage > 1) paginate(currentPage - 1);
                    }}
                    className={currentPage === 1 ? 'disabled' : ''}
                  />
                </PaginationItem>

                {startPage > 1 && (
                  <PaginationItem>
                    <PaginationLink href="#" onClick={(e) => { e.preventDefault(); paginate(1); }}>
                      1
                    </PaginationLink>
                  </PaginationItem>
                )}
                {startPage > 2 && <PaginationEllipsis />}

                {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
                  <PaginationItem key={startPage + index}>
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        paginate(startPage + index);
                      }}
                    >
                      {startPage + index}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                {endPage < totalPages - 1 && <PaginationEllipsis />}
                {endPage < totalPages && (
                  <PaginationItem>
                    <PaginationLink href="#" onClick={(e) => { e.preventDefault(); paginate(totalPages); }}>
                      {totalPages}
                    </PaginationLink>
                  </PaginationItem>
                )}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage < totalPages) paginate(currentPage + 1);
                    }}
                    className={currentPage === totalPages ? 'disabled' : ''}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ResourcesPage;

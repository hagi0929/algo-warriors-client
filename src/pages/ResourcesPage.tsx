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

  return (
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
                <TableHead className='w-1/6'>Name</TableHead>
                <TableHead className='w-1/6'>Description</TableHead>
                <TableHead className='w-1/6'>Links</TableHead>
                <TableHead className='w-1/2'>Topics</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentResources.map(resource => (
                <TableRow key={resource.resource_id} className="bg-accent hover:bg-hover-accent">
                  <TableCell className="truncate">{resource.resource_name}</TableCell>
                  <TableCell className="truncate">{resource.resource_description}</TableCell>
                  <TableCell>
                    <a href={resource.resource_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                      View Repo
                    </a>
                    {' | '}
                    <a href={resource.homepage} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                      View Website
                    </a>
                  </TableCell> 
                  <TableCell>
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
              {Array.from({ length: Math.ceil(filteredResources.length / resourcesPerPage) }, (_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      paginate(index + 1);
                    }}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage < Math.ceil(filteredResources.length / resourcesPerPage)) paginate(currentPage + 1);
                  }}
                  className={currentPage === Math.ceil(filteredResources.length / resourcesPerPage) ? 'disabled' : ''}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResourcesPage;

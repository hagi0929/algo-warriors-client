import React, { useState } from 'react';
import { Card } from './ui/card';
import ProblemTabDescr from './ProblemTabDescr';
import ProblemTabTest from './ProblemTabTest';
import ProblemTabDiscuss from './ProblemTabDiscuss';
import RecommendedProblems from './RecommendedProblems';

interface Props {
  problemId: string;
}

// Define a type for tab content
type TabContent = {
  id: string;
  component: React.ReactNode;
};

const ProblemTabs: React.FC<Props> = ({ problemId }) => {
  // Define tab content with components
  const tabs: TabContent[] = [
    { id: 'Description', component: <ProblemTabDescr problemId={problemId} /> },
    { id: 'Testing', component: <ProblemTabTest  /> },
    { id: 'Discussions', component: <ProblemTabDiscuss  /> },
  ];

  const [activeTab, setActiveTab] = useState<string>(tabs[0].id);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };

  return (
    <Card className="bg-white rounded-lg overflow-hidden shadow-md">
      <div className="flex">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`rounded-t-lg ${activeTab === tab.id ? 'bg-slate-500 text-white' : 'bg-gray-200 text-gray-700'} flex-1 py-2 px-4 text-center`}
            onClick={() => handleTabClick(tab.id)}
          >
            {tab.id}
          </button>
        ))}
      </div>
      <div className="p-4">
        {tabs.map(tab => (
          <div key={tab.id} className={`${activeTab === tab.id ? '' : 'hidden'}`}>
            {tab.component}
            {activeTab === 'Description' && tab.id === 'Description' && <RecommendedProblems />}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ProblemTabs;

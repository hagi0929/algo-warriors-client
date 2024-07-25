import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from './ui/card';
import Editor from '@monaco-editor/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import { Result } from '../models/Result';

interface Props {
  problemId: number;
}

const languageIdMapping: { [key: string]: number } = {
  javascript: 63,
  typescript: 74,
  python: 92,
  java: 91,
  csharp: 51,
  cpp: 53,
  html: 43,
  css: 43
};

const getDefaultCode = (language: any) => {
  switch (language) {
    case 'javascript':
      return '// Write your JavaScript code here';
    case 'typescript':
      return '// Write your TypeScript code here';
    case 'python':
      return 'print("hi")';
    case 'java':
      return 'System.out.println("Hi");';
    case 'csharp':
      return 'Console.WriteLine("Hi");';
    case 'cpp':
      return '#include <iostream>\nint main() {\n  std::cout << "Hi";\n  return 0;\n}';
    case 'html':
      return '<!-- Write your HTML code here -->';
    case 'css':
      return '/* Write your CSS code here */';
    default:
      return '';
  }
};

const CodeEditor: React.FC<Props> = ({ problemId }) => {
  const editorRef = useRef(null);
  const [language, setLanguage] = useState('javascript');
  const navigate = useNavigate();

  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor;
  };

  const handleLanguageChange = (event: any) => {
    setLanguage(event.target.value);
  };

  const handleSubmit = async () => {
    if (editorRef.current) {
      const code = (editorRef.current as any)?.getValue();
      //var formattedCode:string = code.trim();
      //formattedCode = formattedCode.split('\n').map((line: string) => line.trim()).join('\\n');
      const languageId = languageIdMapping[language];

      console.log('Code:', code);
      console.log('Language:', languageId);

      try {
        const response = await fetch('http://127.0.0.1:3000/submission/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            code: code,
            programming_language: languageId,
            problem_id: problemId
          })
        });

        if (!response.ok) {
          console.error('Fetch submission failed:', response.statusText);
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error(`Expected application/json but received ${contentType}`);
        }

        const data = await response.json();
        var res: Result[] = [];
        for (let i = 0; i < data.length; i++) {
          res.push({
            id: i + 1,
            statusDescription: data[i].status.description,
            input: data[i].stdin,
            output: data[i].stdout,
            expectedOutput: data[i].expected_output
          });
        }

        console.log('Results:', res);
        navigate('/results', { state: { results: res } });
      } catch (error) {
        console.error('Fetch submission failed:', error);
      }
    }
  };

  return (
    <Card className="code-editor w-full h-full">
      <div className="flex justify-between items-center mb-2">
        <select
          value={language}
          onChange={handleLanguageChange}
          className="bg-white text-black p-2 rounded"
        >
          <option value="javascript">JavaScript</option>
          <option value="typescript">TypeScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="csharp">C#</option>
          <option value="cpp">C++</option>
          <option value="html">HTML</option>
          <option value="css">CSS</option>
        </select>
        <button
          onClick={handleSubmit}
          className="flex items-center bg-green-500 text-white py-2 px-4 rounded shadow-md hover:bg-green-600"
        >
          <FontAwesomeIcon icon={faCloudUploadAlt} className="mr-2" />
          Submit
        </button>
      </div>

        <Editor
          height="100%"
          width="100%"
          language={language}
          value={getDefaultCode(language)}
          theme="vs-dark"
          onMount={handleEditorDidMount}
        />
    </Card>
  );
};

export default CodeEditor;

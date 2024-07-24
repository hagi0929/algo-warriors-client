import React, { useRef, useState } from 'react';
import { Card, CardContent } from './ui/card';
import Editor from '@monaco-editor/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';

interface Props {}

const languageIdMapping: { [key: string]: number } = {
  javascript: 63, // JavaScript (Node.js 12.14.0)
  typescript: 74, // TypeScript (3.7.4)
  python: 92,     // Python (3.11.2)
  java: 91,       // Java (JDK 17.0.6)
  csharp: 51,     // C# (Mono 6.6.0.161)
  cpp: 76,        // C++ (Clang 7.0.1)
  html: 43,       // Plain Text
  css: 43         // Plain Text
};

const getDefaultCode = (language:any) => {
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

const CodeEditor = (props: Props) => {
  const editorRef = useRef(null);
  const [language, setLanguage] = useState('javascript');

  const handleEditorDidMount = (editor:any, monaco:any) => {
    editorRef.current = editor;
  };

  const handleLanguageChange = (event:any) => {
    setLanguage(event.target.value);
  };

  const handleSubmit = () => {
    if (editorRef.current) {
      const code = (editorRef.current as any)?.getValue();
      var formattedCode = code.trim();
      formattedCode = formattedCode.split('\n').map((line: string) => line.trim()).join('\\n');
      const languageId = languageIdMapping[language];

      console.log('Code:', formattedCode);
      console.log('Language:', languageId);
      //TODO: Submit code to the backend
    }
  };

  return (
    <Card className="code-editor w-full h-full">
      <CardContent className="bg-slate-500 h-full flex flex-col">
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
          height="90%"
          width="100%"
          language={language}
          value={getDefaultCode(language)}
          theme="vs-dark"
          onMount={handleEditorDidMount}
        />
      </CardContent>
    </Card>
  );
};

export default CodeEditor;

import './App.css';
import PictureWindow from './components/PictureWindow';
import TextWindow from './components/TextWindow';
import { useState } from 'react';
import { Row } from './components/types';

export default function App() {
  const [previewImage, setPreviewImage] = useState<string>('');
  const [text, setText] = useState('');
  const [postTitle, setPostTitle] = useState('');
  const [rows, setRows] = useState<Row[]>([]);

  const handleSave = (result: { title: string; content: string[]; rows: Row[] }) => {
    setPostTitle(result.title);
    setText(result.content.join('\n')); 
    setRows(result.rows);
    console.log(result);
  };

  const handleImagePreview = (imageURL: string) => {
    setPreviewImage(imageURL);
  };

  return (
    <div className="main">
      <TextWindow
        text={text}
        setText={setText}
        postTitle={postTitle}
        setPostTitle={setPostTitle}
        rows={rows}
        setRows={setRows}
        onSave={handleSave}
        onImagePreview={handleImagePreview}
        
      />
      <PictureWindow
        previewImage={previewImage}
        text={text}
        postTitle={postTitle}
        rows={rows}
      />
    </div>
  );
}

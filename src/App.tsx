import './App.css';
import PictureWindow from './components/PictureWindow';
import TextWindow from './components/TextWindow';
import { useState } from 'react';

export default function App() {
  const [postData, setPostData] = useState<any>({});
  const [previewImage, setPreviewImage] = useState<string>(''); 

  const handleSave = (result: any) => {
    setPostData(result);
    console.log(result);
  };

  const handleImagePreview = (imageURL: string) => {
    setPreviewImage(imageURL); 
  };

  return (
    <div className="main">
      
      <TextWindow
        postData={postData}
        onSave={handleSave}
        onImagePreview={handleImagePreview}
      />
     
      <PictureWindow postData={postData} previewImage={previewImage} />
    </div>
  );
}

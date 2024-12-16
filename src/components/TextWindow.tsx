import { useState, useRef } from 'react';
import Buttons from './Buttons';

interface TextWindowProps {
    postData: any;
    onSave: (data: any) => void;
    onImagePreview: (imageURL: string) => void; 
  }
  
  export default function TextWindow({ onSave, onImagePreview }: TextWindowProps) {
    const [text, setText] = useState('');
    const [postTitle, setPostTitle] = useState('');
    const [rows, setRows] = useState<any[]>([]);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
  
    const insertTag = (tag: string) => {
      if (textareaRef.current) {
        const start = textareaRef.current.selectionStart;
        const end = textareaRef.current.selectionEnd;
  
        const newText =
          text.substring(0, start) + tag + '\n' + text.substring(end);
        setText(newText);
  
        setTimeout(() => {
          textareaRef.current?.setSelectionRange(
            start + tag.length + 1,
            start + tag.length + 1
          );
          textareaRef.current?.focus();
        }, 0);
      }
    };
  
    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        const fileURL = URL.createObjectURL(file);
        onImagePreview(fileURL); 
      }
    };
  
    const handleSave = () => {
      const contentArray = text.split('\n').filter((line) => line.trim() !== '');
      const updatedPostData = {
        title: postTitle,
        content: contentArray,
        rows: rows,
      };
      if(postTitle !==''){
        onSave(updatedPostData);
        setPostTitle('');
        setText('');
        setRows([]);
    }else{
        alert('Введите название поста');
    }
    
    };
  
    return (
      <div className="textMain">
        <div className="textPath_div">
          <ul className="img_load">
            <li>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: 'none' }}
                id="file-upload"
              />
              <label htmlFor="file-upload" style={{ cursor: 'pointer' }}>
                Загрузить изображение
              </label>
            </li>
            <li className="li_img_load">Выбрать файл</li>
          </ul>
          <hr />
          <label className="postText_label">Текст поста</label>
          <div className="buttons">
            <button onClick={() => insertTag('<b>Вставьте сюда текст</b>')}>b</button>
            <button onClick={() => insertTag('<i>Вставьте сюда текст</i>')}>i</button>
            <button onClick={() => insertTag('<a href="Вставьте ссылку">Вставьте текст</a>')}>link</button>
            <button onClick={() => insertTag('<s>Вставьте сюда текст</s>')}>s</button>
            <button onClick={() => insertTag('<u>Вставьте сюда текст</u>')}>u</button>
          </div>
          <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Введите текст здесь..."
            rows={10}
          />
        </div>
  
        <Buttons content={text} rows={rows} setRows={setRows} />
  
        <div className="confirmWindow">
          <span>Название поста</span>
          <input
            type="text"
            placeholder="Введите название поста"
            value={postTitle}
            onChange={(e) => setPostTitle(e.target.value)}
          />
  
          <button onClick={handleSave}>Сохранить пост</button>
        </div>
      </div>
    );
  }
  
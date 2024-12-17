import { Row } from './types';

interface PictureWindowProps {
  previewImage: string;
  text: string;
  postTitle: string;
  rows: Row[];
}

export default function PictureWindow({
  previewImage,
  text,
  rows,
}: PictureWindowProps) {
  return (
    <div className="picture_block_div">
      {previewImage && (
        <img className="prjct_img" src={previewImage} alt="Загруженное изображение" />
      )}
      <div>
        {text && (
          <div >
            <div className="text_preview" dangerouslySetInnerHTML={{ __html: text }} />
          </div>
        )}

       

        {rows.length > 0 && (
          <ul className="ul_button_link">
            {rows.map((row, index) => (
              <li className="li_button_link" key={index}>
                {row.buttons.map((button, buttonIndex) => (
                  <button
                    className={`button_link ${!button.link ? 'inactive' : ''}`}
                    key={`${index}-${buttonIndex}`}
                    onClick={() =>
                      !button.link
                        ? alert('Ссылка не была введена')
                        : (window.location.href = button.link)
                    }
                  >
                    {button.text || 'Введите текст'}
                  </button>
                ))}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

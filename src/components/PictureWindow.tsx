interface Button {
    text: string;
    link: string;
  }
  
  interface Row {
    buttons: Button[];
  }
  
  interface PictureWindowProps {
    postData: {
      title: string;
      content: string[];
      rows: Row[];
    };
    previewImage: string; 
  }
  
  export default function PictureWindow({postData,previewImage}: PictureWindowProps) {
    return (
      <div className="picture_block_div">
        {previewImage && (
          <img
            className="prjct_img"
            src={previewImage}
            alt="Загруженное изображение"
          />
        )}
        <div>
          {postData.content && postData.content.length > 0 && (
            <ul>
              {postData.content.map((data, index) => (
                <li className="li_illustrate" key={index}>
                  <div dangerouslySetInnerHTML={{ __html: data }} />
                </li>
              ))}
            </ul>
          )}
  
          {postData.rows && postData.rows.length > 0 && (
            <ul className="ul_button_link">
              {postData.rows.map((row, index) => (
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
  
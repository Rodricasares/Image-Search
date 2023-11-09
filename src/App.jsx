import { useState } from "react";
import { Formik, Form, Field } from "formik";
import "./App.css";
import "./header.css";
import "./content.css";
import "./article.css";
const App = () => {
  const [photos, setPhothos] = useState([]);
  const open = (url) => window.open(url);
  console.log({ photos });
  return (
    <div>
      <header>
     
        <Formik
          initialValues={{ search: "" }}
          onSubmit={async (values) => {
            const response = await fetch(
              `https://api.unsplash.com/search/photos?per_page=20&query=${values.search}`,
              {
                headers: {
                  Authorization:
                    "Client-ID HupGkrBCK8_krX7bQ_kLvf-5I03CF0_AmfjHOcbeRsk",
                },
              }
            );
            const data = await response.json();
            setPhothos(data.results);
          }}
        >
          <Form>
            <Field name="search" />
          </Form>
        </Formik>
      </header>
      <div className="container">
        <div className="center">
          {photos == '' ? <h1 style={{margin:"100", padding:"100", color:"black", background:"transparent"}}>Search your image</h1>
   : photos.map((photo) => ( 
          
          
          <article key={photo.id} onClick={() => open(photo.links.html)}>
              <img src={photo.urls.regular} />
              <p>{[photo.description, photo.alt_description].join("-")}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;

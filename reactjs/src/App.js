import { Provider, defaultTheme } from '@adobe/react-spectrum';
import { ListBox, Item, Grid, View } from '@adobe/react-spectrum'
import { useState } from 'react';
import { saveAs } from 'file-saver';

function App() {
  const [names, setNames] = useState(['Warsaw', 'Delhi', 'Madrid', 'NYC', 'Moscow', 'Paris'])
  let [frequency, setFrequency] = useState('');
  let [isLoading, setLoading] = useState(false);


  const getFile = (content) => {
    setLoading(true);
    const URL = process.env.REACT_APP_ENV === 'dev' ? 'http://localhost:8000' : window.location.origin

    return new Promise((res, rej) => {
      fetch(`${URL}/download`, {
        headers: {
          city: content
        }
      })
        .then(res => res.blob())
        .then(
          (result) => {
            console.log('result', result)
            setLoading(false);
            res(result);
          },
          (error) => {
            console.error('Error', error)
            setLoading(false);
            rej(error);
          }
        )
    })

  }

  const downloadFile = (selected) => {
    console.log('I am clicked', [...selected]);
    console.info(process.env.REACT_APP_ENV);
    setFrequency([...selected][0]);

    getFile([...selected][0]).then((res) => {
      console.log('final', res);
      saveAs(res, `${[...selected][0]}.txt`)
    }).catch((err) => {

    })


  }
  return (

    <Provider theme={defaultTheme}>

      <Grid
        areas={['header  header', 'sidebar content', 'footer  footer']}
        columns={['1fr', '3fr']}
        rows={['size-1000', 'auto', 'size-1000']}
        height="size-6000"
        gap="size-100">
        <View backgroundColor="celery-600" gridArea="header" >
          <h1> Click and Download app </h1>
        </View>
        <View gridArea="sidebar" >
          <h2 style={{ padding: '5%' }}> Click on the list item to download file</h2>
        </View>
        <View gridArea="content">
          {
            frequency.length > 0 &&
            <h2>You selected: {frequency}</h2>
          }
          <ListBox
            isLoading={isLoading}
            aria-label="Choose frequency"
            selectionMode="single"
            onSelectionChange={(selected) => downloadFile(selected)}
            width="size-2400">
            {
              names.map((ele) => <Item key={ele}>{ele}</Item>)
            }
          </ListBox>
        </View>
      </Grid>


    </Provider>
  );
}

export default App;

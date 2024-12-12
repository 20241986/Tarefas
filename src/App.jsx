import { v4 as uuid } from 'uuid';
import React, { useState } from 'react';

import { Container, ToDoList, Input, Button, ListItem, Trash, Check } from './styles.js';
function App() {
  const [list, setList] = useState([])
  const [inputTask, setInputTask] = useState('');

  function inputMudou(event) {
    setInputTask(event.target.value);
  }

  function cliqueiNoBotao() {
    if (inputTask){
    setList([...list, { id: uuid(), task: inputTask, finished: false }]);
    }
  }
  function finalizarTarefa(id) {
    const newList = list.map(item => (
      item.id === id ? { ...item, finished: !item.finished } : item
    ));

    setList(newList);
  }

  function deletarItem(id) {
    const newList = list.filter(item => item.id !== id);
    setList(newList);
  }

  return (
    <Container>
      <ToDoList>
        <Input value={inputTask} onChange={inputMudou} placeholder="O que tenho para fazer ..." />
        <Button onClick={cliqueiNoBotao}>Adicionar</Button>

        <ul>
          {
          list.length >0 ? (
          list.map(item =>
            <ListItem $isFinished={item.finished} key={item.id}>
              <Check onClick={() => finalizarTarefa(item.id)} />
              <li>{item.task}</li>
              <Trash onClick={() => deletarItem(item.id)} />
            </ListItem>
          )
        ) : (<h3>não há ítens na lista</h3>)
      }
        </ul>
      </ToDoList>
    </Container>
  );
}

export default App;

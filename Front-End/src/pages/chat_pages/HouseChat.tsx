import React from 'react';
import ChatWindow from '../../components/ChatWindow';

const App: React.FC = () => {
  const messages = [
    {
      body: 'test test test',
      sender: 'user',
      timestamp: 'Mon, 05 Jun 2023 23:03:50 GMT',
    },
    {
      body: 'second test, second test, second test a;ljfeai;jo;ijaiofjeaoijfoiajoifaejoiajfeoijeaofijeaoijfea;iojfoi;jg;oija;gjiio',
      sender: 'ai',
      timestamp: 'Tue, 06 Jun 2023 00:48:21 GMT',
    },
    {
      body: 'third test, third test, third test',
      sender: 'user',
      timestamp: 'Tue, 06 Jun 2023 00:48:44 GMT',
    },
    {
        body: 'third test, third test, third test',
        sender: 'user',
        timestamp: 'Tue, 06 Jun 2023 00:48:44 GMT',
      },
      {
        body: 'third test, third test, third test df;kaljfijapoifjaewo;ijfiaoefio;ajifo;eajif;aeijf;aoiesjfdj;iopdfd dddddddddddddddddddddddddd efafeafea dfaeefeeaf',
        sender: 'user',
        timestamp: 'Tue, 06 Jun 2023 00:48:44 GMT',
      },{
        body: 'third test, third test, third test',
        sender: 'user',
        timestamp: 'Tue, 06 Jun 2023 00:48:44 GMT',
      },{
        body: 'third test, third test, third test',
        sender: 'user',
        timestamp: 'Tue, 06 Jun 2023 00:48:44 GMT',
      },{
        body: 'third test, third test, third test',
        sender: 'user',
        timestamp: 'Tue, 06 Jun 2023 00:48:44 GMT',
      },{
        body: 'third test, third test, third test',
        sender: 'user',
        timestamp: 'Tue, 06 Jun 2023 00:48:44 GMT',
      },{
        body: 'third test, third test, third test',
        sender: 'user',
        timestamp: 'Tue, 06 Jun 2023 00:48:44 GMT',
      },{
        body: 'third test, third test, third test',
        sender: 'user',
        timestamp: 'Tue, 06 Jun 2023 00:48:44 GMT',
      },{
        body: 'third test, third test, third test',
        sender: 'user',
        timestamp: 'Tue, 06 Jun 2023 00:48:44 GMT',
      }

  ];

  return (
    <div>
      <ChatWindow messages={messages} />
    </div>
  );
};

export default App;
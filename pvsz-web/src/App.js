import axios from 'axios';
function App() {
  const getDataHandler = () => {
    axios.get('http://localhost:5000/api/v1/user').then((res) => {
      console.log(res, '请求数据');
    });
  };
  return (
    <div className='App'>
      <button onClick={getDataHandler}>点击按钮获取数据</button>
    </div>
  );
}

export default App;

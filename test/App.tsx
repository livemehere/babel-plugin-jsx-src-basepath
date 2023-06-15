
export default function App() {
    const [me, setMe] = useState('/bbb.png');

    return (
        <div>
            <h1>React App</h1>
            <img src={me} alt="" />
            <video src="https://sample.com/sample.mp4"></video>
            <img src="/img/like.png" alt=""/>
        </div>
    );
}
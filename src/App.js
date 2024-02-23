import logo from "./logo.svg";
import "./App.css";
import { ConfigProvider, Tabs } from "antd";
import SectionListing from "./sectionListing";
import LawBot from "./LawBot";
const items: TabsProps["items"] = [
  {
    key: "1",
    label: "Bhartiya Nyaya Sanhita",
    children: <SectionListing type={0} />,
  },
  {
    key: "2",
    label: "Indian Penal Code",
    children: <SectionListing type={1} />,
  },
  {
    key: "3",
    label: "Bharatiya Nagarik Suraksha Sanhita",
    children: <SectionListing type={2} />,
  },
  {
    key: "4",
    label: "Code of Criminal Procedure",
    children: <SectionListing type={3} />,
  },
  {
    key: "5",
    label: "Bharatiya Sakshya Adhiniyam",
    children: <SectionListing type={4} />,
  },
  {
    key: "6",
    label: "Indian Evidence Act",
    children: <SectionListing type={5} />,
  },
  {
    key: "7",
    label: "Law Bot",
    children: <LawBot />,
  },
];

function App() {
  function onChange() {}
  return (
    <div className="App">
      <ConfigProvider theme={{ token: { colorPrimary: "red" } }}>
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      </ConfigProvider>
    </div>
  );
}

export default App;

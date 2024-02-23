import { Divider, List, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { Radio } from "antd";
import { Collapse } from "antd";
import { Alert, Flex, Spin } from "antd";
import { Link } from "react-router-dom";
import { BASE_URL } from "../constants";

const data = [
  "Racing car sprays burning fuel into crowd.",
  "Japanese princess to wed commoner.",
  "Australian walks 100km after outback crash.",
  "Man charged over missing wedding girl.",
  "Los Angeles battles huge wildfires.",
  "Racing car sprays burning fuel into crowd.",
  "Japanese princess to wed commoner.",
  "Australian walks 100km after outback crash.",
  "Man charged over missing wedding girl.",
  "Los Angeles battles huge wildfires.",
  "Racing car sprays burning fuel into crowd.",
  "Japanese princess to wed commoner.",
  "Australian walks 100km after outback crash.",
  "Man charged over missing wedding girl.",
  "Los Angeles battles huge wildfires.",
];
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const items: CollapseProps["items"] = [
  {
    key: "1",
    label: "This is panel header 1",
    children: <p>{text}</p>,
  },
  {
    key: "2",
    label: "This is panel header 2",
    children: <p>{text}</p>,
  },
  {
    key: "3",
    label: "This is panel header 3",
    children: <p>{text}</p>,
  },
];

function getChapterPayload(type, id) {
  switch (type) {
    case 0:
      return {
        category: "CRIMINALS_LAWS",
        group: "ACT",
        sortorder: "ASC",
        subcategory: "NEW_CRIMINAL_ACT",
        subgroup: "BNS_NEW",
        Id: id,
      };
    case 1:
      return {
        category: "CRIMINALS_LAWS",
        group: "ACT",
        sortorder: "ASC",
        subcategory: "OLD_CRIMINAL_ACT",
        subgroup: "BNS_IPC",
        Id: id,
      };
    case 2:
      return {
        category: "CRIMINALS_LAWS",
        group: "ACT",
        sortorder: "ASC",
        subcategory: "NEW_CRIMINAL_ACT",
        subgroup: "BNSS_NEW",
        Id: id,
      };
    case 3:
      return {
        category: "CRIMINALS_LAWS",
        group: "ACT",
        sortorder: "ASC",
        subcategory: "OLD_CRIMINAL_ACT",
        subgroup: "BNSS_CRPC",
        Id: id,
      };
    case 4:
      return {
        category: "CRIMINALS_LAWS",
        group: "ACT",
        sortorder: "ASC",
        subcategory: "NEW_CRIMINAL_ACT",
        subgroup: "BSA_NEW",
        Id: id,
      };
    case 5:
      return {
        category: "CRIMINALS_LAWS",
        group: "ACT",
        sortorder: "ASC",
        subcategory: "OLD_CRIMINAL_ACT",
        subgroup: "BSA_IEA",
        Id: id,
      };
  }
}

function SectionListing({ type }) {
  const [sectionData, setSectionData] = useState(null);
  const [subjectData, setSubjectData] = useState(null);
  const [chapterData, setChapterData] = useState(null);
  const [value, setValue] = useState(1);
  function getPayload() {
    switch (type) {
      case 0:
        return {
          category: "CRIMINALS_LAWS",
          group: "ACT",
          sortorder: "ASC",
          subcategory: "NEW_CRIMINAL_ACT",
          subgroup: "BNS_NEW",
        };
      case 1:
        return {
          category: "CRIMINALS_LAWS",
          group: "ACT",
          sortorder: "ASC",
          subcategory: "OLD_CRIMINAL_ACT",
          subgroup: "BNS_IPC",
        };
      case 2:
        return {
          category: "CRIMINALS_LAWS",
          group: "ACT",
          sortorder: "ASC",
          subcategory: "NEW_CRIMINAL_ACT",
          subgroup: "BNSS_NEW",
        };
      case 3:
        return {
          category: "CRIMINALS_LAWS",
          group: "ACT",
          sortorder: "ASC",
          subcategory: "OLD_CRIMINAL_ACT",
          subgroup: "BNSS_CRPC",
        };
      case 4:
        return {
          category: "CRIMINALS_LAWS",
          group: "ACT",
          sortorder: "ASC",
          subcategory: "NEW_CRIMINAL_ACT",
          subgroup: "BSA_NEW",
        };
      case 5:
        return {
          category: "CRIMINALS_LAWS",
          group: "ACT",
          sortorder: "ASC",
          subcategory: "OLD_CRIMINAL_ACT",
          subgroup: "BSA_IEA",
        };
    }
  }
  useEffect(() => {
    fetch(BASE_URL + "criminalslaws/api/v1/home/getSectionList", {
      method: "POST",
      body: JSON.stringify(getPayload()),
    })
      .then((data) => data.json())
      .then((data) => {
        console.log(data, "daaaa");
        setSectionData(data.Data.results);
        setChapterData(data.Data.aggregationByChapter);
        setSubjectData(data.Data.aggregationBySubject);
      })
      .catch((err) => console.log(err));
  }, []);
  function ChapterList({ id }) {
    const [cpl, setCp] = useState(null);
    useEffect(() => {
      async function getChapterData(id) {
        const tempData = await fetch(
          BASE_URL + "criminalslaws/api/v1/home/getActChapterSectionsList",
          {
            method: "POST",
            body: JSON.stringify(getChapterPayload(type, id)),
          }
        );
        const json = await tempData.json();
        return setCp(json.Data.results);
      }
      getChapterData(id);
    }, []);
    return (
      <>
        {cpl && (
          <List
            size="large"
            bordered
            style={{ marginTop: 20 }}
            dataSource={cpl}
            renderItem={(item) => (
              <Link
                state={{ documentId: item.id }}
                to={{ pathname: "/sublist" }}
              >
                <List.Item style={{ textAlign: "left", cursor: "pointer" }}>
                  {item?.heading}
                </List.Item>
              </Link>
            )}
          />
        )}
      </>
    );
  }
  function SubjectList({ id }) {
    const [cpl, setCp] = useState(null);
    useEffect(() => {
      async function getChapterData(id) {
        const tempData = await fetch(
          BASE_URL + "criminalslaws/api/v1/home/getActSubjectSectionsList",
          {
            method: "POST",
            body: JSON.stringify(getChapterPayload(type, id)),
          }
        );
        const json = await tempData.json();
        return setCp(json.Data.results);
      }
      getChapterData(id);
    }, []);
    return (
      <>
        {cpl && (
          <List
            size="large"
            bordered
            style={{ marginTop: 20 }}
            dataSource={cpl}
            renderItem={(item) => (
              <Link
                state={{ documentId: item.id }}
                to={{ pathname: "/sublist" }}
              >
                <List.Item style={{ textAlign: "left", cursor: "pointer" }}>
                  {item?.heading}
                </List.Item>
              </Link>
            )}
          />
        )}
      </>
    );
  }
  console.log(chapterData, "section");
  function getChapterItems() {
    return chapterData.map((item, index) => {
      return {
        key: index.toString(),
        label: item.name,
        children: <ChapterList id={item.id} />,
      };
    });
  }
  function getSubjectItems() {
    return subjectData.map((item, index) => {
      return {
        key: index.toString(),
        label: item.name,
        children: <SubjectList id={item.id} />,
      };
    });
  }
  return (
    <>
      <Radio.Group onChange={(e) => setValue(e.target.value)} value={value}>
        <Radio value={1}>Section-wise</Radio>
        <Radio value={2}>Chapter-wise</Radio>
        <Radio value={3}>Subject-wise</Radio>
      </Radio.Group>
      {sectionData ? (
        <>
          {value === 1 && (
            <List
              size="large"
              bordered
              style={{ marginTop: 20 }}
              dataSource={sectionData}
              renderItem={(item) => (
                <Link
                  state={{ documentId: item.id }}
                  to={{ pathname: "/sublist" }}
                >
                  <List.Item style={{ textAlign: "left", cursor: "pointer" }}>
                    <List.Item.Meta
                      title={<a href="https://ant.design">{item.heading}</a>}
                      description={item.subheading}
                    />
                  </List.Item>
                </Link>
              )}
            />
          )}
          {value === 2 && (
            <Collapse
              items={getChapterItems()}
              defaultActiveKey={[""]}
              onChange={() => {}}
              style={{ textAlign: "left", marginTop: 20 }}
            />
          )}
          {value === 3 && (
            <Collapse
              items={getSubjectItems()}
              defaultActiveKey={["1"]}
              onChange={() => {}}
              style={{ textAlign: "left", marginTop: 20 }}
            />
          )}
        </>
      ) : (
        <Spin tip="Loading...">
          <Alert message="Fetching Data" type="info" />
        </Spin>
      )}
    </>
  );
}

export default SectionListing;

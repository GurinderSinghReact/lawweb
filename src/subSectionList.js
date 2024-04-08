import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Divider, List, Typography, Collapse, Row, Col } from "antd";
import { BASE_URL } from "./constants";

const { Panel } = Collapse;

function SubSectionList() {
  const [secList, setSecList] = useState([]);
  const {id} = useParams();
  const [currentId, setCurrentId] = useState(null);
  const [sectionData, setSectionData] = useState(null);
  useEffect(() => {
    fetch(
      BASE_URL + `criminalslaws/api/v1/crlaw/home/get_section_comparison`,
      {
        method: "post",
        body: JSON.stringify({
          documentId: id,
        }),
        headers: {
          Taxmannauthorization:
            "BearereyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Ijc3MzcwMSIsImVtYWlsSWQiOiIxMG1hbm9qMTA5NkBnbWFpbC5jb20iLCJzZWNyZXRBY2Nlc3NDb2RlIjoiIiwidXNlcklEIjoiNzczNzAxIiwiZmlyc3ROYW1lIjoiTWFub2ogWWFkYXYiLCJtb2JpbGUiOiI4ODI1MzczMTE0IiwiZGVzaWduYXRpb24iOiJDSEFSVEVSRUQgQUNDT1VOVEFOVCIsInRpbWVTdGFtcCI6MTcxMjU3OTcxOTIzOCwibmJmIjoxNzEyNDkzMzE5LjIzOCwiZXhwIjoxNzE1MTcxNzE5LjIzOCwiaWF0IjoxNzEyNTc5NzE5LjIzOCwiaXNzIjoiN2JhYWNmMmMtZjRlZS00NzcxLTk0NWYtNGVhM2ZjMGUxZGE2IiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo2NDA2NC8ifQ.DGkfZatDzoWVQyOJ0mFx8pXgZtriEZ2hq-Lu57R-rAI",
        },
      }
    )
      .then((data) => data.json())
      .then((data) => {
        setSecList(data.Data);
        console.log(data.Data, 'sdljdslksdjlskdjsdlk')
        if(data?.Data?.length > 0){
          getScript(data?.Data[0]?.id || data?.Data[0]?.child[0]?.id)
        }
      });
  }, []);

  const getScript = (currentId) => {
    if(currentId){
      setCurrentId(currentId);
      fetch(
        BASE_URL + `criminalslaws/api/v1/crlaw/home/viewFileContent`,
        {
          method: "post",
          body: JSON.stringify({
            fileId: currentId,
          }),
          headers: {
            Taxmannauthorization:
              "BearereyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Ijc3MzcwMSIsImVtYWlsSWQiOiIxMG1hbm9qMTA5NkBnbWFpbC5jb20iLCJzZWNyZXRBY2Nlc3NDb2RlIjoiIiwidXNlcklEIjoiNzczNzAxIiwiZmlyc3ROYW1lIjoiTWFub2ogWWFkYXYiLCJtb2JpbGUiOiI4ODI1MzczMTE0IiwiZGVzaWduYXRpb24iOiJDSEFSVEVSRUQgQUNDT1VOVEFOVCIsInRpbWVTdGFtcCI6MTcxMjU3OTcxOTIzOCwibmJmIjoxNzEyNDkzMzE5LjIzOCwiZXhwIjoxNzE1MTcxNzE5LjIzOCwiaWF0IjoxNzEyNTc5NzE5LjIzOCwiaXNzIjoiN2JhYWNmMmMtZjRlZS00NzcxLTk0NWYtNGVhM2ZjMGUxZGE2IiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo2NDA2NC8ifQ.DGkfZatDzoWVQyOJ0mFx8pXgZtriEZ2hq-Lu57R-rAI",
          },
        }
      )
        .then((data) => data.json())
        .then((data) => {
          setSectionData(data?.Data[0]?.text);
          console.log(data, "ahlkjhlkajlkj");
        });
    }
  }

  const panelHeader = (
    <React.Fragment>
      <Row
        onClick={(event) => {
          event.stopPropagation();
          alert("hi");
        }}
      >
        <Col>
          <p>Header</p>
        </Col>
      </Row>
    </React.Fragment>
  );


  console.log(currentId, "secsddssdsd");
  return secList.length > 0 ? (
    <div style={{ flex: 1, display: "flex", flexDirection: "row" }}>
      <div style={{ flex: 0.3 }}>
        
        <Collapse accordion>
          {secList.map((val, ind) => {
            return (
              <Panel
                key={val?.key}
                header={
                  <React.Fragment>
                    <Row
                      onClick={(event) => {
                        if(val?.id){
                          event.stopPropagation();
                          getScript(val?.id);
                        }
                      }}
                    >
                      <Col>
                        <p>{val?.label}</p>
                      </Col>
                    </Row>
                  </React.Fragment>
                }
              >
                {val?.child?.length > 0 && (
                  <List
                    size="large"
                    bordered
                    style={{ marginTop: 20 }}
                    dataSource={val?.child}
                    renderItem={(item, index) => {
                      return (
                        <List.Item
                          onClick={() => getScript(item?.id)}
                          style={{
                            textAlign: "left",
                            cursor: "pointer",
                            backgroundColor:
                            item?.id === currentId ? "beige" : "white",
                          }}
                        >
                          {item?.label}
                        </List.Item>
                      );
                    }}
                  />
                )}
              </Panel>
            );
          })}
        </Collapse>
      </div>
      <div style={{ flex: 0.7, padding: "1%" }}>
        {sectionData && (
          <div dangerouslySetInnerHTML={{ __html: sectionData }}></div>
        )}
      </div>
    </div>
  ) : null;
}

export default SubSectionList;

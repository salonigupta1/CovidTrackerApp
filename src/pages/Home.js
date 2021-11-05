import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Columns from "react-columns";
import Form from "react-bootstrap/Form";
import NumberFormat from "react-number-format";
import ReactTooltip from "react-tooltip";
import RingLoader from "react-spinners/RingLoader";
import Toggle from "react-toggle";
import "react-toggle/style.css";
const imgAddr = "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1932&q=800";
function Home() {
  const [latest, setLatest] = useState([]);
  const [results, setResults] = useState([]);
  const [searchCountries, setSearchCountries] = useState("");
  const [loading, setLoading] = useState(true);
  const [darkTheme, setDarkTheme] = useState(false);

  useEffect(() => {
    axios
      .all([
        axios.get("https://corona.lmao.ninja/v2/all"),
        axios.get("https://www.mohfw.gov.in/data/datanew.json"),
      ])
      .then((responseArr) => {
        setLatest(responseArr[0].data);
        setResults(responseArr[1].data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const date = new Date(parseInt(latest.updated));
  const lastUpdated = date.toString();

  const filterCountries = results.filter((item) => {
    return searchCountries !== ""
      ? item.state_name.toLowerCase().includes(searchCountries.toLowerCase())
      : item;
  });

  const countries = filterCountries.map((data, i) => {
    return (
      <Card
        key={i}
        bg={darkTheme ? "dark" : "light"}
        text={darkTheme ? "light" : "dark"}
        className="text-center"
        style={{ margin: "10px" }}
      >
        <Card.Img variant="top" src={imgAddr} />
        <Card.Body>
          <Card.Title>{data.state_name}</Card.Title>
          <Card.Text>Active Cases {data.active}</Card.Text>
          <Card.Text>Positive Cases {data.positive}</Card.Text>
          <Card.Text>Cured {data.cured}</Card.Text>
          <Card.Text>Deaths {data.death}</Card.Text>
          <Card.Text>New Active {data.new_active}</Card.Text>
          <Card.Text>New Positive {data.new_positive}</Card.Text>
          <Card.Text>New Death's {data.new_death}</Card.Text>
        </Card.Body>
      </Card>
    );
  });

  var queries = [
    {
      columns: 2,
      query: "min-width: 500px",
    },
    {
      columns: 3,
      query: "min-width: 1000px",
    },
  ];

  const handleDarkThemeChange = () => {
    setDarkTheme(!darkTheme);
  };

  return (
    <div
      style={{
        backgroundColor: darkTheme ? "black" : "white",
        color: darkTheme ? "white" : "black",
      }}
    >
      <br />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <RingLoader size={50} color={"green"} loading={loading} />
      </div>
      <br />
      <h2
        data-tip="Last modified date: 16/05/2020 - v2.2"
        style={{ textAlign: "center" }}
      >
        COVID-19 Live Now
      </h2>
      <ReactTooltip effect="solid" />
      <br />
      <div style={{ textAlign: "center" }}>
        <Toggle
          defaultChecked={false}
          icons={{
            checked: "🌜",
            unchecked: "🌞",
          }}
          onChange={handleDarkThemeChange}
        />
      </div>
      <br />
      <CardDeck>
        <Card
          bg="secondary"
          text="white"
          className="text-center"
          style={{ margin: "10px" }}
        >
          <Card.Body>
            <Card.Title>Cases</Card.Title>
            {/* <Card.Text>{latest.cases}</Card.Text> */}
            <NumberFormat
              value={latest.cases}
              displayType={"text"}
              thousandSeparator={true}
              style={{ fontSize: "30px" }}
            />
          </Card.Body>
          <Card.Footer>
            <small>Last updated {lastUpdated}</small>
          </Card.Footer>
        </Card>
        <Card
          bg="danger"
          text={"white"}
          className="text-center"
          style={{ margin: "10px" }}
        >
          <Card.Body>
            <Card.Title>Deaths</Card.Title>
            <Card.Text>
              {" "}
              <NumberFormat
                value={latest.deaths}
                displayType={"text"}
                thousandSeparator={true}
                style={{ fontSize: "30px" }}
              />
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>Last updated {lastUpdated}</small>
          </Card.Footer>
        </Card>
        <Card
          bg="success"
          text={"white"}
          className="text-center"
          style={{ margin: "10px" }}
        >
          <Card.Body>
            <Card.Title>Recovered</Card.Title>
            <Card.Text>
              {" "}
              <NumberFormat
                value={latest.recovered}
                displayType={"text"}
                thousandSeparator={true}
                style={{ fontSize: "30px" }}
              />
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>Last updated {lastUpdated}</small>
          </Card.Footer>
        </Card>
      </CardDeck>
      <br />
      <Form>
        <Form.Group controlId="formGroupSearch">
          <Form.Control
            bg="dark"
            type="text"
            placeholder="Search for States"
            onChange={(e) => setSearchCountries(e.target.value)}
          />
        </Form.Group>
      </Form>
      <Columns queries={queries}>{countries}</Columns>
    </div>
  );
}

export default Home;
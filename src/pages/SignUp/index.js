import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { signUp } from "../../store/user/actions";
import { fetchAllProduces } from "../../store/produce/actions";
import { selectToken } from "../../store/user/selectors";
import { selectAllProduces } from "../../store/produce/selectors";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { Col } from "react-bootstrap";
import Select from "react-select";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [description, setDescription] = useState("");
  const [profileImg, setProfileImg] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [countryId, setCountryId] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const history = useHistory();
  const allProduces = useSelector(selectAllProduces);

  const producesToSelect = allProduces.map((eachProduce) => {
    return { value: eachProduce.id, label: eachProduce.name };
  });

  const [selectedProduces, setSelectedProduces] = useState([]);

  const produceIdArray = selectedProduces.map((eachProduce) => {
    return eachProduce.value;
  });

  // upload image to cloudinary and set url to profileImg:
  const uploadImage = async (event) => {
    const files = event.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "bug2pov7");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dbyywopzz/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const image = await res.json();
    console.log("cloudinary url: ", image.url);

    setProfileImg(image.url);
  };

  useEffect(() => {
    dispatch(fetchAllProduces());
    if (token !== null) {
      history.push("/");
    }
  }, [token, history]);

  function submitForm(event) {
    event.preventDefault();

    dispatch(
      signUp(
        name,
        email,
        password,
        website,
        description,
        profileImg,
        phone,
        location,
        countryId,
        produceIdArray
      )
    );

    setEmail("");
    setPassword("");
    setName("");
    setWebsite("");
    setDescription("");
    setProfileImg("");
    setPhone("");
    setLocation("");
    setCountryId(null);
    setSelectedProduces([]);
  }

  return (
    <Container>
      <Form as={Col} md={{ span: 6, offset: 3 }} className="mt-5">
        <h1 className="mt-5 mb-5">Signup for a producer profile</h1>

        <Form.Group controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            value={name}
            onChange={(event) => setName(event.target.value)}
            type="text"
            placeholder="Enter your name or the name of your business"
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicWebsite">
          <Form.Label>Website</Form.Label>
          <Form.Control
            value={website}
            onChange={(event) => setWebsite(event.target.value)}
            type="text"
            placeholder="Enter your website address"
          />
        </Form.Group>

        <Form.Group controlId="formBasicDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            type="text"
            placeholder="Describe your production"
          />
        </Form.Group>

        <Form.Group controlId="formBasicProfileImg">
          <Form.Label>Profile image</Form.Label>
          <Form.Control onChange={uploadImage} type="file" />
        </Form.Group>

        <Form.Group controlId="formBasicProfile">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            type="text"
            placeholder="Enter your phone number"
          />
        </Form.Group>

        <Form.Group controlId="formBasicLocation">
          <Form.Label>Location</Form.Label>
          <Form.Control
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            type="text"
            placeholder="Where do you sell your products?"
          />
        </Form.Group>

        <Form.Group controlId="formBasicCountryId">
          <Form.Label>Country</Form.Label>
          <br></br>
          <select
            name="countries"
            id="countries"
            onChange={(event) => setCountryId(parseInt(event.target.value))}
          >
            <option value={null}>Select your country...</option>
            <option value={1}>Netherlands</option>
            <option value={2}>Portugal</option>
            <option value={3}>Greece</option>
          </select>
        </Form.Group>

        <Form.Group controlId="formBasicCountryId">
          <Form.Label>Produces</Form.Label>
          <Select
            isMulti
            name="colors"
            onChange={(selectedProduces) =>
              setSelectedProduces(selectedProduces)
            }
            options={producesToSelect}
            className="basic-multi-select"
            classNamePrefix="select"
          />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            placeholder="Enter your email"
            required
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            placeholder="Password"
            required
          />
        </Form.Group>

        <Form.Group className="mt-5">
          <Button variant="primary" type="submit" onClick={submitForm}>
            Sign up
          </Button>
        </Form.Group>
        <Link to="/login">Click here to log in</Link>
      </Form>
    </Container>
  );
}

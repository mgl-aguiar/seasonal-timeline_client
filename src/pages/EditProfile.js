import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../store/user/selectors";

export default function EditProfile() {
  const user = useSelector(selectUser);

  const [name, setName] = useState(user.name);
  const [description, setDescription] = useState(user.description);
  const [website, setWebsite] = useState(user.website);
  const [phone, setPhone] = useState(user.phone);
  const [profileImg, setProfileImg] = useState(user.profileImg);
  const [location, setLocation] = useState(user.location);

  return (
    <div>
      <h1>Edit your producer profile</h1>
      <form onSubmit={null} className="editProfileForm">
        <label style={{ marginBottom: "20px" }}>
          Name:
          <input
            type="text"
            value={name}
            placeholder="Your name or the name of your business"
            onChange={(input) => setName(input.target.value)}
          />
        </label>
        <label style={{ marginBottom: "20px" }}>
          Description:
          <input
            type="text"
            value={description}
            placeholder="Describe your production"
            onChange={(input) => setDescription(input.target.value)}
            style={{ width: "100%" }}
          />
        </label>
        <label style={{ marginBottom: "20px" }}>
          Website:
          <input
            type="text"
            value={website}
            placeholder="Your website URL"
            onChange={(input) => setWebsite(input.target.value)}
            style={{ marginLeft: "20px" }}
          />
        </label>
        <label style={{ marginBottom: "20px" }}>
          Phone:
          <input
            type="text"
            value={phone}
            placeholder="Your contact number"
            onChange={(input) => setPhone(input.target.value)}
            style={{ marginLeft: "20px" }}
          ></input>
        </label>

        <label style={{ marginBottom: "20px" }}>
          Location:
          <input
            type="text"
            value={location}
            placeholder="Where do you sell your products?"
            onChange={(input) => setLocation(input.target.value)}
            style={{ marginLeft: "20px" }}
          ></input>
        </label>

        <label style={{ marginBottom: "20px" }}>
          Profile Image:
          <input
            type="text"
            value={profileImg}
            placeholder="Your profile image URL"
            onChange={(input) => setProfileImg(input.target.value)}
            style={{ marginLeft: "20px" }}
          ></input>
        </label>

        <input
          type="submit"
          value="Save changes"
          className="submitButton"
        ></input>
      </form>{" "}
    </div>
  );
}

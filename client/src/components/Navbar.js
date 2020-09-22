import React, { useContext, useRef, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../App";
import M from "materialize-css";
import "./style.css";
const NavBar = () => {
  const searchModal = useRef(null);
  const [search, setSearch] = useState("");
  const [userDetails, setUserDetails] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  useEffect(() => {
    M.Modal.init(searchModal.current);
  }, []);
  const renderList = () => {
    if (state) {
      return [
        <li key="1">
          <i
            data-target="modal1"
            className="large material-icons modal-trigger"
            style={{ color: "black" }}
          >
            search
          </i>
        </li>,
        <li key="2">
          <Link className="mainlink" to="/profile">
            <img
              className="basicrightpic"
              src="https://res.cloudinary.com/instagram-clone-aravind/image/upload/v1600651729/profile_klyusr.png"
              alt="picstalogo"
            />
          </Link>
        </li>,
        <li key="3">
          <Link className="mainlink" to="/creatpost">
            <img
             className="basicrightpic"
              src="https://res.cloudinary.com/instagram-clone-aravind/image/upload/v1600651698/addpost_n72buh.png"
              alt="picstalogo"
            />
          </Link>
        </li>,
        <li key="4">
          <Link className="mainlink" to="/myfollowingpost">
            <img
              className="basicrightpic"
              src="https://res.cloudinary.com/instagram-clone-aravind/image/upload/v1600651720/myposts_epacl6.png"
              alt="picstalogo"
            />
          </Link>
        </li>,
        <li key="5">
          <button
            className="btn #c62828 red darken-3"
            onClick={() => {
              localStorage.clear();
              dispatch({ type: "CLEAR" });
              history.push("/signin");
            }}
          >
            Logout
          </button>
        </li>,
      ];
    } else {
      return [
        <li key="6">
          <Link to="/signin">Signin</Link>
        </li>,
        <li key="7">
          <Link to="/signup">Signup</Link>
        </li>,
      ];
    }
  };

  const fetchUsers = (query) => {
    setSearch(query);
    fetch("/search-users", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
      }),
    })
      .then((res) => res.json())
      .then((results) => {
        setUserDetails(results.user);
      });
  };
  return (
    <nav id="navbar">
      <div className="nav-wrapper white">
        <Link to={state ? "/" : "/signin"} className="brand-logo left">
          <img
            className="logo"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAABWVBMVEX///8nKTPk6OlSVmsiJStEjv//Nldew4j/3075+fkAABFxe4/o7O0AABXAMUolIR8LKDE6bsIAAAB3eH0bHSkgIi0MEB//6E1Ejf//6Or/+unp8P//3DdMvn3r9u//EkMqg/9gxn3FxshcXWO7u74AAAi60W1sbHEjJixMUGNGSVsuMTs6PUtSoHUWGCUdHyrOM0/PtkhOUFc+d9A/QEnM0NI5PEs9P0eqq63iNFLZ3d6YmZyJio6goaR0dXpAQkvx00za0KAwcM/yNVXX3+dSVFthanveNFHPtDtXr326BjL/5Ta0zl5NwnEaX7zlyEiXq1nQuljUwnPWyIjd063Fz7WryryZwax4spJfpn7e2sLM3NZNpWg/gOfh4dTTV2vdtLyyxeFbidTbpK2jut/UZHfRR1/gxcpShNRtldfXfYx+odqeL0XZkZ2Qrdw2YaevkJiOnLTH1OW43DstAAANpElEQVR4nO2d+XfbxhHHCVptCgpIUwK7Se8GgEpTkJcUZQoweNmyKSpuG+eqndqxkzRJ0xxN2vz/PxSLaw8sSMjPxkJ++817USQSDD6c2dkDs7OdjpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSktKrpG5orcAB1v0/8vrL7zj99fec/vYnXu/28WeBlRV2ZaNh6Z5rQhtoWG+8/nNeb/6C059f4/T2Wz/j9KtfJp8GbGi6ni4b0FnBlO7FEyaUcOXIBbQovpdBiBktiXzGCmnaSybUNLQypAH6I60BQm3kS0LUb3KAL4tQG92UE2+WSLs84ZvPQ6ihpQxAz+TvYyvh7dsPHlzEeu/GjRvvxLoUoWZ6zQPqPqhLmLAdH7//wYd37nz094ePHj36+B83EtDahMBv3k9DWLoNIeHtmO79D+48ftY1sNJ/xz+fPEk433ntbR5QRKjBsHHCSdmEZcK7ty4uPriD4bolJZiPPr7xydM6hGDSNGAkMCFPeHezGWO8Mh3BjCFPzp7uJtRg1DDhrBRIecK7482nn4mMV7Ll5/88O9tJiGYNEw74vpAjvLsZf/V1Db6U8advzk52EI4GDRMGgmZIEW7q2Y+x49OthCBoFlAXOWlBeGs8/mJr8xMwdr8s2qOQUEPN9hd6ubsnhJv7X0WX40sY732TIYoJzYYJe5WEd8fj/4g7B/zXKP6n+IV/S2zGasJeWwhvjf/1NX/3MU/kzCw30KBpmlALXGvmRGVK46d/YzO2m/DWhvfQGMSZuT5ENiiiE7AR9N2Zw0Omntpqwlv3v+X5osXERqLIC5A9WUQ843dnT9tM+P2GbYIxnyXGyyHRcsoyGj+c/dhmQg5wujRFIwNathkzsogtJoT/pe/V6M6Azb7BT8UxghnTeRr/E415W0EILeZGHWadyj86HF7LNTw8ojHRymOutETjiRYQ2i51m4YxoxYaTw+vlXV4WrwO4IxujYZrlz9ePiFYUb5mRC5xNRFeBkns71KdjNFdlaOTfEKNChjGdJVbwa/mSxhzb7UD5voW2hAt6BssFnGOtvJhHeU+4NOIi1JTlE1oDxgLZID+cCdgHHYyMwJAI5YmoLIJEWmExIKnNfiwTnMrkrZolJZJJBPCkLq3mxng9hZIK4s44CaFyC/mySUEa8q/8lBfx0MLT8183aW6DG41Ty4hcsh3P4fVgMNDLOErmS/MyQc5sD2EowF1X2aFix4eadf3Ul3Xjsovp5eZZHRjuKPWENrEhN0syvAERzldrut8P5Ih+sRNHbsthMClfDTtx7jbP9oTiX9T6vAWZUTQEkJUeJYxTe/JZ63D26+wI2vptF+0i17R8FA7CEFAvvVB6lhMLBEbUGDGYalR++0gRLPiS8/CH2Mafwvg3h5j7bQpwqJVG/SzA4mEMOKGWn59QA7RZ41oRGYbCEmcMaZlE+4CZBFTI5qkJa5BCwjJpCJzKvqWT3cCsm0xMaJddPv0FEMeISTfeMCb8LAG4N4efUH6mbxXSCUEE9JDp184ZZKqboLVdeqK1C3IwIYMTqUR2kUPbVhJV0FNmer4KBZ9ifAzpRJSzTBdXKFW1GoC7u1R1+DPACtBQ5RHmDfDfG2F2IPp6of759VxlQo2qesXH0omGNIIi3m54UHOSelWeG0/VmWzpFpi4qbFhNqIfNmEYFI41NxmIykdSEcYcL86tFJXsf0FCTXSCEl/P+CaIeOUCeGqkpD0ocngFJBhjSubkIS97Nuu6CpWMeB5JSDtplwXZI1kExb+FCX9PTWg4a1U+OhoVEYkl/lp62Z9XyJh0VkYkcYSVjW6yTk2Z8D99ZAlBEX8KroLWYQk6k0RG0rFhMF+pvMqwjSYFt1FKJ3QKwhhDcICkEesJPRgawlFU/vr+5SYhnp0BQlFNhzShPt0d1LtpdIJL9UOzxnCYS1C2e2QiqVgZyxlnJRtie2NpWQZKh1BUoOTSxEOWULSH85kE24Z01yKkFyWmHBFxjSye3xqBJmMS0HFuHRHO6RMn3yK255xac25Re6LVbGUn1uQSb70uYUWFC0mjevUZFbgpudiE1JOmjy9QCHbuqUSUnN8fjlY4Ka+uBXSFyU2nLJ9kFRC6vl2wDVE0TqNlluRsTC/ThN0WceQSlhaFzvaasR4pnh+vn8+ZF6iTJg46WjZprU2sC6+b49f8q672EY9qvLZZthdy18v1WySP1F6/LvtwRoRZfV0zRsUX1rUilX9kHMpOotm94MZ9tEMvyActmBVn34YNk0fhtHPR3ev69Nr+ukzUtNhRxGyCTXULZzK5Ubf8T3vQrxOfx+nacsmeQ9UwonMJ6TETb3yA8ShthWQMXj2DJikBYTteAZMBm7FE81rtLa1RTalgQvObFqU1FyMUvYEm7JXHVHZfJNT3oROS3IxNHtJjJglY7BpJEOxGbnczNRHqTROYzlqCSGVHpytmpay2g7LjHzycJbZpkUkNDP/D7lZX1S+XZj2GGwDwwBHNKR/VErfSycRJpXGabUm64t63oddC4kRryWbELCEyYkpIKJ8dMpmCcslpHOgizx7AUa1sm9qRT6Gz4OWnSNMJU0WSdD1U2izNgiofH+yFNwOQiq3Lb63vP3UTYPOt13Y1NYZg6/ZID2TfU4j5sla9VLZ870zJg0457cjyCakE6Gxh+XbEXabMd9TAiAN6LVuv0Xsp/S2Hif3MXC6vTUOT/M3avRXFJXrikgnZOOpMZ0URtjCOCw2d6EVvQtRtLVLPiGdZ483Z1kkc7LCVw9Jgqy5pLcgFvn+LSPUILX1KZmfUx2az2XnMxsQR9yVC9EWyzYQMsEw2aHHbAEGmn+ayteYvyOX2f5tCKoXtYXwje8/Y27V8CawFDE4ATjxmL3Oxuc/7rWYcMMgYkYXCvaDFrLh2mMraBhfnrWacLz5gttfbzgWguIN3SOILI/fj//l2Um7CccbvihGjBAONIRGTNsbIaQNwlJ5JeOHs5OTFu9Wf+P1WzFiubAJLhyxWE6COKhACNFICyaDRalkRDcpGnFy0uqaCq/j0jSbcumPblrNZDp1sKbTSFjcBBf+iAFbUhejsj7N3XHiqeX7zzANceUWPEbAHnrSmtomwrIHeX2a8eZTgRm3KzXgSXV9GthwTTpfdBN5jaGY8f63lyozZNz7LjNgJaHfLGDHFfXkeZ0obMbYVWszGvd+OMsNWFkJy22YcEe9NmzGzfjbOr5qGD99d0IMWFmvbd4w4VQUath6bVhffbS95lccdB5+w/JVEJrThgl1UcE2ruYe1sXxh4+7FZQY7+Mbn2A+qh5dRd3EoPHilyI3LdVNHI+Pjy9wccjHKVBOhv8zwmUhY33C2K+KsPGigp2Osd1L89qXD46xLnCFzw/vfPT42bNnT548fJhXME0Ia9W+1CSUEhZMU8X1S48zXVzkNWiJ3qlZvxQumgfsdMo1ZKqq7BLK4+P3GLyaNWjBSgZgxygV8dpaKfn2gwcPLo6xDZkywnUIAZJU7npqg0sQPn+1a2A33VMQRG3UAOFIkwbY6XRX8KUTwpXcMyBmEL1UQgSb7wg5GXM/P97iRRMCG/pzaacGUNIda+3bZqzeCzmj5K13+/jDbH9tOdLP7yiUjch+XdJveP2hpN+WlI3tZEMpKSkpKSkpKb2CGiQH3h0cwGCZnQbXbc+g8oXIsrWRbdsjZELTx6fBzfqyjtp6SbJgljE0nWs2Pp7JBz3Jx969YFnkjDtjYgOjE/bXr5abUoQd3b7M+qbjNv3Q5flEE2KXrX+ld9D0ITnPJ4YwhJP6HuqZV5BwAS/xPPNKEq7R9qM1p57nFF2JY9Jn/+kO/VqbRBN6EDodp4+PStP9fvHMYdAHya2HKB4Z9PqD+Bf9oN+H2qgfK4lNzqSfvOa24pxcVoRQD23kYtMknhpp+YpnCO3k7LSZCd3FwtLwr/pkNQmAP1mtgjC+0u2Zk3n8mg9R08es7ZaFVvNEAx9CfDZqRogNmqzKR6CXHNMYmSj52V314jfoetIOdR1HJn0SpIMEfQnXUii2ybJHZqZRYrScsDM3k+MZJ2Zq5EX2sxPN03hLRZpiBVG/2W+dn1poHSbysucoBWFnjXvHuZmdYDgzuXV6YSydH7RuyGfxJxMTQt3vhU5Py4wSQi7pQEgYHkg4eXS7thDiB40+yu/YACgI6ZkVR6h3oyjqznpXirAzQzZ5dRqYJgoGi7yh0YR66Poo7kH6EF4pQj1Atk/Cv+4NYM+EaFmKNI7f6wcWbsyWjPNxt2sboWtaFtf6up4Ls6EdIYxMuMyi6dVqhzPzpt4JStMNz+4ldiWEA1jMoxZXidAx8VgmsvleojNIPZEQQlh0gssr5KWGZianFXvQTLu4oqOzeMIDO+/xDe0KRZo1zKYOcwi6eGSW+18XpF5K3DkoTm4eQNT8Ic47VEU4N4tDYNcIz4sH0JzH3aE+zVumcYD7SiOmD024iN+hT9doZrZuaWPZ4054d/p48Oz1ySzBQMl7LGjClRv0zHXmk5YJJ+skyCxNU3PXfh850/72GaYEhXPOrSIrnvHp8znVnpy5hXGn8wD1gRvm3Yc+Cw7gJLncGWh9GMy7na4lJVfvxSmdLdG/V72ipKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSk9Arp/3gOTKRM/dWJAAAAAElFTkSuQmCC"
            alt="picstalogo"
          />
        </Link>
        <ul id="nav-mobile" className="right">
          {renderList()}
        </ul>
      </div>
      <div
        id="modal1"
        class="modal"
        ref={searchModal}
        style={{ color: "black" }}
      >
        <div className="modal-content">
          <input
            type="text"
            placeholder="search users"
            value={search}
            onChange={(e) => fetchUsers(e.target.value)}
          />
          <ul className="collection">
            {userDetails.map((item) => {
              return (
                <Link
                  to={
                    item._id !== state._id ? "/profile/" + item._id : "/profile"
                  }
                  onClick={() => {
                    M.Modal.getInstance(searchModal.current).close();
                    setSearch("");
                  }}
                >
                  <li className="collection-item">{item.email}</li>
                </Link>
              );
            })}
          </ul>
        </div>
        <div className="modal-footer">
          <button
            className="modal-close waves-effect waves-green btn-flat"
            onClick={() => setSearch("")}
          >
            close
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

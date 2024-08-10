import React from "react";
import styled from "styled-components";
import logo from "/images/admin.png";
function Admin() {
  return (
    <Wrapper>
      <Holder>
        {/* <Auth>
          <div className="logo">
            <img src={logo} alt="admin-logo" />
          </div>
          <form>
            <input type="mail" placeholder="Email Address" />
            <input type="password" placeholder="Password" />
            <button>Sign in</button>
          </form>
        </Auth> */}
        <MainPage>
          <nav>
            <div className="logo">
              <img src={logo} alt="admin-logo" />
            </div>
          </nav>

          <ViewPort>
            <form action="POST">
              <input type="text" placeholder="Transaction ID" />
              <button type="submit">Get details</button>
            </form>
          </ViewPort>
        </MainPage>
      </Holder>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  width: 100vw;
  min-height: 100vh;
  overflow-x: hidden;
  background-color: #ffffff;
`;

const Holder = styled.div`
  max-width: 1280px;
  margin: 0px auto;
  min-height: 100vh;
`;

const Auth = styled.section`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  gap: 30px;
  background-color: var(--light-grey);
  padding: 100px 15px;
  border-radius: 15px;

  .logo {
    width: 200px;
    margin: 0px auto;
    pointer-events: none;
    img {
      width: 100%;
      position: relative;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 99vw;
    max-width: 400px;
    justify-content: center;
    align-items: center;

    input {
      width: 90%;
      max-width: 400px;
      height: 50px;
      outline: none;
      /* background-color: var(--light-grey); */
      background-color: white;
      border: none;
      border-radius: 5px;
      padding-left: 10px;
    }

    button {
      width: 110px;
      height: 35px;
      border: none;
      background-color: black;
      color: white;
      border-radius: 5px;
      cursor: pointer;
    }
  }
`;

const MainPage = styled.section`
  position: relative;
  width: 100%;
  min-height: 100vh;
  nav {
    width: 100%;
    height: 80px;
    border-bottom: solid 2px var(--medium-grey);
    display: flex;
    justify-content: space-between;
    align-items: center;

    .logo {
      width: 180px;
      margin: 0px auto;
      pointer-events: none;
      img {
        width: 100%;
        position: relative;
      }
    }
  }
`;

const ViewPort = styled.div`
  position: relative;
  width: 400px;
  background-color: red;
  margin: 0px auto;
  padding: 20px;

  form {
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;

    input {
      width: 90%;
      height: 40px;
      outline: none;
      border-radius: 5px;
      border: solid 2px var(--medium-grey);
      background-color: var(--light-grey);
    }
  }
`;

export default Admin;

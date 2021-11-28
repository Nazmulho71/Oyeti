import Header from "../common/header";
import Router from "next/router";
import nextCookie from "next-cookies";
import { logout } from "../../middleware/auth";
import styled from "styled-components";
import ImageConst from "../../utils/ImageConst";
import EditCMP from "./edit";
import { useState } from "react";

const Index = ({ auth }) => {
  const [isUpdateProfile, setIsUpdateProfile] = useState(false);

  return (
    <div className="wrapper" style={{ height: "100vh", background: "#fff" }}>
      <div className="container m-0 p-0">
        <Header
          title={`Profile`}
          goBack={() => Router.back()}
          subtitle="Edit"
          // onSubTitileClick={() => Router.push("/profile/edit")}
          onSubTitileClick={() => setIsUpdateProfile(true)}
        />

        <Container>
          <Userdetails>
            <UsernameText>{auth.name}</UsernameText>
            <Phonegroup>
              <PhoneiconRow>
                <Phoneicon src={ImageConst.callImage}></Phoneicon>
                <Userphone>{auth.phone}</Userphone>
              </PhoneiconRow>
            </Phonegroup>
            <Emailgroup>
              <EmailiconRow>
                <Emailicon src={ImageConst.emailImage}></Emailicon>
                <Useremail>{auth.email}</Useremail>
              </EmailiconRow>
            </Emailgroup>
          </Userdetails>

          <Placeholder>
            <IconRow onClick={() => Router.push("/profile/address")}>
              <Icon src={ImageConst.locationImage}></Icon>
              <Placeholdertext>Manage Address</Placeholdertext>
              <Arrow src={ImageConst.rightArrowImage}></Arrow>
            </IconRow>
          </Placeholder>
          <Placeholder>
            <IconRow>
              <Icon src={ImageConst.helpImage}></Icon>
              <Placeholdertext>Oyeti Support</Placeholdertext>
              <Arrow src={ImageConst.rightArrowImage}></Arrow>
            </IconRow>
          </Placeholder>

          <Placeholder1 onClick={() => logout()}>
            <Placeholdertext1>Logout</Placeholdertext1>
          </Placeholder1>
        </Container>

        {isUpdateProfile && <EditCMP submit={() => console.log("")} />}
      </div>
    </div>
  );
};

Index.getInitialProps = async (ctx) => {
  const { asPath, query } = ctx;
  const { token } = nextCookie(ctx);

  let isLoggedIn = token ? true : false;
  return { isLoggedIn, token, asPath, query };
};

const Logout = styled.span`
  font-family: Overpass;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", "Overpass", sans-serif;

  font-style: normal;
  font-weight: 400;
  color: #400282;
  margin-left: 131px;
  align-self: center;
`;

const Placeholder1 = styled.div`
  margin: 24px;
  height: 52px;
  margin-top: 50px;
  background-color: rgba(247, 249, 255, 1);
  border-radius: 20px;
  flex-direction: column;
  display: flex;
  align-items: center;
`;

const Placeholdertext1 = styled.span`
  font-weight: 400;
  color: #121212;
  margin-top: 18px;
`;

const Placeholder = styled.div`
  display: flex;
  margin: 24px;
  background-color: rgba(247, 249, 255, 1);
  border-radius: 20px;
  margin-top: 20px;
  flex-direction: row;
  height: 52px;
`;

const Icon = styled.img`
  height: 19px;
  object-fit: contain;
`;

const Arrow = styled.img`
  height: 19px;
  object-fit: contain;
  margin-left: 40%;
`;

const Placeholdertext = styled.span`
  font-weight: 400;
  color: #121212;
  margin-left: 15px;
`;

const IconRow = styled.div`
  height: 19px;
  flex-direction: row;
  display: flex;
  flex: 1 1 0%;
  margin-left: 23px;
  margin-top: 17px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Userdetails = styled.div`
  flex-direction: column;
  display: flex;
  margin: 24px;
  background-color: rgba(247, 249, 255, 1);
  border-radius: 20px;
  margin-top: 100px;
  display: flex;
`;

const UsernameText = styled.span`
  font-weight: 500;
  color: rgba(64, 0, 130, 1);
  font-size: 22px;
  margin-top: 25px;
  margin-left: 23px;
`;

const Phonegroup = styled.div`
  width: 106px;
  height: 16px;
  flex-direction: row;
  display: flex;
  margin-top: 13px;
  margin-left: 23px;
`;

const Phoneicon = styled.img`
  width: 100%;
  height: 15px;
  margin-top: 1px;
  object-fit: contain;
`;

const Userphone = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  color: #121212;
  margin-left: 17px;
`;

const PhoneiconRow = styled.div`
  height: 16px;
  flex-direction: row;
  display: flex;
  flex: 1 1 0%;
`;

const Emailgroup = styled.div`
  width: 140px;
  height: 16px;
  flex-direction: row;
  display: flex;
  margin-top: 10px;
  margin-left: 23px;
  margin-bottom: 25px;
`;

const Emailicon = styled.img`
  width: 100%;
  height: 9px;
  margin-top: 4px;
  object-fit: contain;
`;

const Useremail = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  color: #121212;
  margin-left: 13px;
`;

const EmailiconRow = styled.div`
  height: 16px;
  flex-direction: row;
  display: flex;
  flex: 1 1 0%;
`;

export default Index;

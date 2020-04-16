import React from "react";
import App, { Container } from "next/app";
import Head from "next/head";
import Copyright from "../components/Copyright";
import { Layout, Menu } from "antd";
import Link from "next/link";

const { Header, Footer, Sider, Content } = Layout;
//@ts-ignore
import "antd/dist/antd.css";
import "../global.scss";
class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <Head>
          <title>GraphQL Fullstack Web App</title>
        </Head>

        <Layout style={{ height: "100vh" }}>
          <Header>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[]}>
              <Menu.Item key="1">
                <Link href="/">
                  <a>Home</a>
                </Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link href="/login">
                  <a>Log In</a>
                </Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link href="/signup">
                  <a>Sign Up</a>
                </Link>
              </Menu.Item>
              <Menu.Item key="4">
                <Link href="/signout">
                  <a>Log Out</a>
                </Link>
              </Menu.Item>
            </Menu>
          </Header>

          {/* <Sider>Sider</Sider> */}
          <Content style={{ padding: "3em" }}>
            <Component {...pageProps} />
          </Content>

          <Footer style={{ textAlign: "center" }}>
            <Copyright />
          </Footer>
        </Layout>
      </>
    );
  }
}

export default MyApp;

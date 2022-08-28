import NavBar from "../component.js/homepage/NavBar";
import Background from "../component.js/homepage/Background";
import About from "../component.js/homepage/About";
import Footer from "../component.js/homepage/Footer";

import Head from "next/head";

const homePage = () => {
  return(
    <div className="homePage">
      <Head>
        <title>Home page</title>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
      </Head>

      <NavBar />
      <Background />
      <About />
      <Footer />
    </div>
  )
}

export default homePage
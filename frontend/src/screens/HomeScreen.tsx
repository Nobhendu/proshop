import { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import axios from "axios";
import Product from "../components/Product";
import { productType } from "../../typings/*";

const HomeScreen = () => {
  const [products, setProducts] = useState<productType[]>([] as productType[]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get<productType[]>(
          "http://localhost:5000/api/products"
        );
        setProducts(data);
      } catch (e) {
        console.log("e");
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <h1>Latest Products</h1>
      {/* {console.log(products.length)} */}
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;

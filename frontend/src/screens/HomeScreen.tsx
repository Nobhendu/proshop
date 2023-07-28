import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { productType } from "../../typings/*";
import { useGetProductsQuery } from "../slices/productsApiSlice";

const HomeScreen = () => {
  const { data: products, isLoading, error } = useGetProductsQuery(0);

  return (
    <>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : error ? (
        "status" in error! ? (
          <div>
            {"error" in error ? error.error : JSON.stringify(error.data)}
          </div>
        ) : (
          <div>{error.message}</div>
        )
      ) : (
        <>
          <h1>Latest Products</h1>
          <Row>
            {(products as productType[]).map((product: productType) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

export default HomeScreen;

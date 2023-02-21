import React from "react";
import { Link } from "react-router-dom";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
  } from "@material-tailwind/react";



export default function AboutUs() {
  return (
    <>
      <main>
        <section className="absolute w-full h-full">
          <div
            className="absolute top-0 w-full h-full bg-gray-900"
            style={{
              backgroundImage:
              "url('https://cdn.pixabay.com/photo/2021/10/11/17/37/doctor-6701410_960_720.jpg')",
              backgroundSize: "100%",
              backgroundRepeat: "no-repeat"
            }}
          ></div>
              <Card className="w-96">
                <CardHeader color="blue" className="relative h-56">
                  <img
                    src="/img/blog.jpg"
                    alt="img-blur-shadow"
                    className="h-full w-full"
                  />
                </CardHeader>
                <CardBody className="text-center">
                  <Typography variant="h5" className="mb-2">
                    Cozy 5 Stars Apartment
                  </Typography>
                  <Typography>
                    The place is close to Barceloneta Beach and bus stop just 2 min by
                    walk and near to "Naviglio" where you can enjoy the main night life in
                    Barcelona.
                  </Typography>
                </CardBody>
                <CardFooter divider className="flex items-center justify-between py-3">
                  <Typography variant="small">$899/night</Typography>
                  <Typography variant="small" color="gray" className="flex gap-1">
                    <i className="fas fa-map-marker-alt fa-sm mt-[3px]" />
                    Barcelona, Spain
                  </Typography>
                </CardFooter>
              </Card>
            
          </section>
          </main>
          </>
          )
          }
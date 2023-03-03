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
              <Card className="w-96 mx-auto align-items-center">
                <CardHeader >
                  
                </CardHeader>
                <CardBody className="text-center">
                  <Typography variant="h5" className="mb-2">
                   Self Service Hospital Appointment Booking System
                  </Typography>
                  <Typography>
                    A self service platform that offers simple and elegant remote services to hospitals. It allows patients to book appointments online and allows doctors to manage schedules easily
                  </Typography>
                </CardBody>
                <CardFooter divider className="flex items-center justify-between py-3">
                  <Typography variant="small">Hospital</Typography>
                  <Typography variant="small" color="gray" className="flex gap-1">
                    <i className="fas fa-map-marker-alt fa-sm mt-[3px]" />
                    Zimbabwe
                  </Typography>
                </CardFooter>
              </Card>
            
          </section>
          </main>
          </>
          )
          }
import React from 'react';
import { Card, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

    function RenderSalary({staff}) {
        const basicSalary = 3000000;
        const overTimeSalary = 200000;
        return(
            <Card>
                <CardBody>
                    <CardTitle>{staff.name}</CardTitle>
                    <CardText>Mã nhân viên: {staff.id}</CardText>
                    <CardText>Hệ số lương: {staff.salaryScale}</CardText>
                    <CardText>Số giờ làm thêm: {staff.overTime}</CardText>
                    <Card style={{backgroundColor: "#f7f7f7"}}>
                        <CardText className="ml-3">Lương: {(Math.round((staff.salaryScale)*basicSalary + (staff.overTime)*overTimeSalary)).toLocaleString()} VND</CardText>
                    </Card>
                </CardBody>
            </Card>   
        );
    }
    function SalaryList (props) {
        const list = props.staffs.map((staff) => {
            return (
                <div className="col-12 col-md-6 col-lg-4 m-0 mt-1">
                    <RenderSalary staff = {staff}/>
                </div>
            );
        });
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-4">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/staffs">Nhân viên</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Bảng lương</BreadcrumbItem>
                    </Breadcrumb>
                    </div>  
                </div>
                <div className="row">
                    {list}
                </div>
            </div>
        )
    }
export default SalaryList;
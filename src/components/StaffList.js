import React, { useState, useRef } from 'react';
import { Card, CardText, CardImg, Button, Form, FormGroup, FormFeedback, Label, Input, Col, 
    ModalHeader, Modal, ModalBody} from 'reactstrap';
import { Link } from 'react-router-dom';
    
    function RenderStaff({staff}) {
        return(
            <Card>
                <Link to = {`/staffs/${staff.id}`} >
                    <CardImg  width="100%" src= {staff.image} alt = {staff.name} />
                    <CardText className="text-center">{staff.name}</CardText>
                </Link>
            </Card>  
        );
    }
    function AddStaff(props) {
        const [isOpen, setIsOpen] = useState(false);
        const [state, setState] = useState({
            staffname: '',
            doB: '',
            startDate: '',
            salaryScale: 1,
            annualLeave: 0,
            overTime: 0
        });
        const [touch, setTouch] = useState({
            staffname: false,
            doB: false,
            startDate: false,
            salaryScale: false,
            annualLeave: false,
            overTime: false
        });
        const handleBlur = (field) => (evt) => {
            setTouch({...touch, [field]: true})
        };
        const handleInputChange = (event) =>{
            const target = event.target;
            const value = target.value;
            const name = target.name;
            setState({
                ...state,[name]: value
            })
        }
        const validate = (staffname, doB, startDate, salaryScale, annualLeave, overTime) => {
            const errors = {
                staffname: '',
                doB: '',
                startDate: '',
                salaryScale: '',
                annualLeave: '',
                overTime: ''
            };
            const regexdate = /^\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/;
            const regexnumber = /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/;
            if (touch.doB && staffname === ''){
                errors.staffname='Yêu cầu nhập'
            } else if (touch.doB && staffname.length < 3){
                errors.staffname='Yêu cầu nhiều hơn 2 ký tự'
            } else if (touch.doB && staffname.length > 29){
                errors.staffname='Yêu cầu ít hơn 30 ký tự'
            };
            
            if (touch.doB && !regexdate.test(doB)){
                errors.doB='Yêu cầu nhập'
            };
            if (touch.startDate && !regexdate.test(startDate)){
                errors.startDate='Yêu cầu nhập'
            };
            if (touch.salaryScale && !regexnumber.test(salaryScale)){
                errors.salaryScale='Yêu cầu nhập số'
            };
            if (touch.annualLeave && !regexnumber.test(annualLeave)){
                errors.annualLeave='Yêu cầu nhập số'
            };
            if (touch.overTime && !regexnumber.test(overTime)){
                errors.overTime='Yêu cầu nhập số'
            };
            return errors;
        }
        const onButtonClick = () => {
            setTouch({
                ...touch,
                staffname: true,
                doB: true,
                startDate: true,
                salaryScale: true,
                annualLeave: true,
                overTime: true
            });
        }
        const handleSubmit = (values) => {
            if (errors.staffname==='' && errors.doB==='' && errors.startDate==='' && errors.salaryScale==='' && errors.annualLeave==='' && errors.overTime===''){
                props.addStaff(values);
                console.log(touch)
            }
            values.preventDefault();
        };
        const toggleModal =() =>{
                setIsOpen(!isOpen)
        };
        const errors = validate(state.staffname, state.doB, state.startDate, state.salaryScale, state.annualLeave, state.overTime);
        return(
            <div>
                <Button  onClick={toggleModal} style = {{marginTop: 3, marginLeft: 7}}><i style={{width: 35}} className="fa fa-plus"></i></Button>
                <Modal isOpen={isOpen}>
                    <ModalHeader toggle={toggleModal}>
                        <h5>Thêm nhân viên</h5>
                    </ModalHeader>
                    <ModalBody>
                        <Form onSubmit={(values) => {handleSubmit(values)}}>
                            <FormGroup row>
                                <Label htmlFor="staffname" lg={4} md={4} sm={12}>Tên</Label>
                                <Col lg={8} md={8} sm={12}>
                                    <Input  
                                        type="text" id="staffname" name="staffname" 
                                        value = {state.staffname} 
                                        onBlur = {handleBlur('staffname')}
                                        onChange = {handleInputChange} 
                                        valid = {errors.staffname===''}
                                        invalid = {errors.staffname!==''} />
                                    <FormFeedback>{errors.staffname}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="doB" lg={4} md={4} sm={12}>Ngày sinh</Label>
                                <Col lg={8} md={8} sm={12}>
                                    <Input type="date" id="doB" name="doB" 
                                        value = {state.doB}
                                        onBlur = {handleBlur('doB')}
                                        onChange = {handleInputChange} 
                                        valid = {errors.doB===''}
                                        invalid = {errors.doB!==''}
                                     />
                                    <FormFeedback>{errors.doB}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="startDate" lg={4} md={4} sm={12}>Ngày vào công ty</Label>
                                <Col lg={8} md={8} sm={12}>
                                    <Input type="date" id="startDate" name="startDate"
                                        value = {state.startDate}
                                        onBlur = {handleBlur('startDate')}
                                        onChange = {handleInputChange} 
                                        valid = {errors.startDate===''}
                                        invalid = {errors.startDate!==''}/>
                                    <FormFeedback>{errors.startDate}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="dept" lg={4} md={4} sm={12}>Phòng ban</Label>
                                <Col lg={8} md={8} sm={12}>
                                    <Input type="select" id="dept" name="department">
                                        <option value="Dept01">Sale</option>
                                        <option value="Dept02">HR</option>
                                        <option value="Dept03">Marketing</option>
                                        <option value="Dept04">IT</option>
                                        <option value="Dept05">Finance</option>
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="scale" lg={4} md={4} sm={12}>Hệ số lương</Label>
                                <Col lg={8} md={8} sm={12}>
                                    <Input type="text" id="scale" placeholder="1.0 -> 3.0" 
                                        defaultValue = "1" name="salaryScale" 
                                        onBlur = {handleBlur('salaryScale')}
                                        onChange = {handleInputChange} 
                                        valid = {errors.salaryScale===''}
                                        invalid = {errors.salaryScale!==''}
                                    />
                                    <FormFeedback>{errors.salaryScale}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="leave" lg={4} md={4} sm={12}>Số ngày nghỉ còn lại</Label>
                                <Col lg={8} md={8} sm={12}>
                                    <Input type="text" id="leave" placeholder="1.0" 
                                        defaultValue = "0" name="annualLeave" 
                                        onBlur = {handleBlur('annualLeave')}
                                        onChange = {handleInputChange} 
                                        valid = {errors.annualLeave===''}
                                        invalid = {errors.annualLeave!==''}/>
                                    <FormFeedback>{errors.annualLeave}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="overtime" lg={4} md={4} sm={12}>Số ngày đã làm thêm</Label>
                                <Col lg={8} md={8} sm={12}>
                                    <Input type="text" id="overtime" placeholder="1.0" 
                                        defaultValue = "0" name="overTime" 
                                        onBlur = {handleBlur('overTime')}
                                        onChange = {handleInputChange} 
                                        valid = {errors.overTime===''}
                                        invalid = {errors.overTime!==''}
                                    />
                                    <FormFeedback>{errors.overTime}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <Input className="btn-primary col-2 col-md-4 col-lg-4"  type="submit" onClick = {onButtonClick} value="Thêm"/>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
    function List (props) { 
        const [staffs, setStaffs] = useState(props.staffs);
        const searchText = useRef(null);
        const search =(e)=>{
            e.preventDefault();
            const searchval = searchText.current.value.toLowerCase();
            setStaffs(props.staffs.filter((staff) =>{ return staff.name.toLowerCase().indexOf(searchval)!==-1}));
        }
        const list = staffs.map((staff) => {
            return (
                <div key={staff.id} className="col-6 col-md-4 col-lg-2 m-0 mt-1">
                    <RenderStaff staff = {staff}/>
                </div>
            );
        });
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="row">
                            <div style={{display: 'flex', justifyContent: 'left'}} className="col-12 col-md-6 col-lg-6 m-0">
                                <h3 className="col-9 col-md-8 col-lg-8" style={{margin: 2, padding: 0}}>Nhân viên</h3> 
                                <AddStaff addStaff={props.addStaff}/>
                            </div>
                            <Form onSubmit = {search} className="col-12 col-md-6 col-lg-6 m-0" style={{display: 'flex', justifyContent: 'left'}}>
                                <Input className="col-9 col-md-8 col-lg-8" style = {{margin: 3, width: 20}} type="text" placeholder="Nguyễn Văn A" innerRef={searchText}/>
                                <Button style ={{backgroundColor: '#0d6efd', color: 'white', margin: 3, marginLeft: 7, width: 58}}>Tìm</Button>
                            </Form>
                        </div>    
                        <hr />
                    </div>                
                </div>
                <div className="row">
                    {list}
                </div>
            </div>
        )
    }
export default List;
import React, { Component } from 'react';
import List from './StaffList';
import StaffDetail from './StaffdetailComponent';
import DeptList from './DepartmentComponent';
import SalaryList from './SalaryComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { DEPARTMENTS, STAFFS } from '../shared/staffs';
import { Switch, Route, Redirect } from 'react-router-dom';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      staffs: STAFFS,
      departments: DEPARTMENTS,
    };
  }
    render(){
        const StaffWithId = ({match}) => {
            return(
                <StaffDetail staff={this.state.staffs.filter((staff) => staff.id === parseInt(match.params.staffId,10))[0]} />
            );
          };
        const addStaff = (newstaff) => {
          const dept = this.state.departments.filter((dept) =>{return dept.id === newstaff.target.department.value})[0];
          const newstaffs = {
            id: this.state.staffs.length,
            name: newstaff.target.staffname.value,
            doB: newstaff.target.doB.value,
            salaryScale: newstaff.target.salaryScale.value,
            startDate: newstaff.target.startDate.value,
            department: dept,
            annualLeave: newstaff.target.annualLeave.value,
            overTime: newstaff.target.overTime.value,
            image: '/assets/images/alberto.png',
          };
          const key = this.state.departments.indexOf(dept);
          const departments = this.state.departments.slice();
          departments[key].numberOfStaff += 1;
          const staffobject = JSON.stringify(newstaffs);
          localStorage.setItem(`${newstaffs.name}`, staffobject);
          this.setState({
            staffs: [...this.state.staffs, JSON.parse(localStorage.getItem(`${newstaffs.name}`))],
            departments: departments
          })
        }
        return (
            <div>
                <Header/>
                <Switch>
                    <Route exact path="/staffs" component= {() => <List staffs={this.state.staffs} addStaff={addStaff}/>}/>
                    <Route path='/staffs/:staffId' component={StaffWithId} />
                    <Route exact path="/department" component={() => <DeptList departments={this.state.departments}/>}/>
                    <Route exact path="/salary" component={() => <SalaryList staffs={this.state.staffs}/>}/>
                    <Redirect to="/staffs" />
                </Switch>
                <Footer/>
            </div>
        );
  
    }
}

export default Main;
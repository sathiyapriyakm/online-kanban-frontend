import React from 'react'
import { BarChart,Cell, Bar,LineChart,PieChart,Pie, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';



export function ChartDashboard({userData}) {

    const data1=[
        {Source:"Total Events",value:userData.totalEvents},
        {Source:"Participated Events",value:userData.participatedEvents},
        {Source:"Evaluvated Events",value:(+userData.participatedEvents - +userData.taskNotEval)},
    ]
    const COLORS=["#0275d8","#5cb85c","#5bc0de"];

    
  return (
    <>
<div className="row">
<div className="col-xl-8 col-lg-7">
    <div className="card shadow mb-4">
        <div
            className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
            <h6 className="m-0 font-weight-bold text-info">Perfomance Overview</h6>
            <div className="dropdown no-arrow">
                <a className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                </a>
                <div className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                    aria-labelledby="dropdow.ponMenuLink">
                    <div className="dropdown-header">Dropdown Header:</div>
                    <a className="dropdown-item" href="#">Action</a>
                    <a className="dropdown-item" href="#">Another action</a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="#">Something else here</a>
                </div>
            </div>
        </div>
        <div className="card-body">
            <div className="chart-area">
        <ResponsiveContainer width="100%" height="100%">
           
            <BarChart width={600} height={600} data={userData.taskEval}>
    <Bar dataKey="Mark"  barSize={25} fill="#36b9cc" />

    <Tooltip/>
    <XAxis dataKey="Event" />
    <YAxis />
    {/* <Tooltip/> */}
  </BarChart>
       </ResponsiveContainer>
            </div>
        </div>
    </div>
</div>
<div className="col-xl-4 col-lg-5">
    <div className="card shadow mb-4">
        <div
            className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
            <h6 className="m-0 font-weight-bold text-info">Participation Overview</h6>
            <div className="dropdown no-arrow">
                <a className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                </a>
                <div className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                    aria-labelledby="dropdownMenuLink">
                    <div className="dropdown-header">Dropdown Header:</div>
                    <a className="dropdown-item" href="#">Action</a>
                    <a className="dropdown-item" href="#">Another action</a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="#">Something else here</a>
                </div>
            </div>
        </div>
        <div className="card-body">
            <div className="chart-pie pt-4 pb-2">
        <ResponsiveContainer width="100%" height="100%">
        <PieChart width="100%" height="100%">
            <Pie
          data={data1} 
          dataKey="value"
          innerRadius={60}
          outerRadius={80} 
          fill="#8884d8"
          paddingAngle={5}
        >
        	{
          	data1.map((entry, index) => <Cell key={index} fill={COLORS[index]}/>)
          }
        </Pie>
        <Tooltip/>
        </PieChart> 
      </ResponsiveContainer>
      
            </div>
        </div>
        <div className="mt-4 text-center small">
                <span className="mr-2">
                    <i className="fas fa-circle text-primary" title="Event Conducted">Total Event</i>
                </span>
                <span className="mr-2">
                    <i className="fas fa-circle text-success" title =" Event participated">Participated Event</i>
                </span>
                <span className="mr-2">
                    <i className="fas fa-circle text-info" title="Event Evaluvated">Evaluvated Event </i>
                </span>
            </div>
    </div>
</div>
</div>
</>
  );
}


   
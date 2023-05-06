import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";
import axios from "axios";
import { UserContext } from "../Context/ContextData";

const SignupSchema = yup.object().shape({
  Name: yup
    .string()
    .required("Please Enter Name")
    .matches(/^[a-zA-z]+([\s][a-zA-Z]+)*$/, {
      message: "Please Enter Valid Name ",
    }),
  sex: yup.string().required("*"),
  guardian: yup.string().required("*"),
  country: yup.string().required("*"),
  state: yup.string().required("*"),
  city: yup.string().required("*"),
  guardian_name: yup
    .string()
    .required("Please Enter Guardian Name")
    .matches(/^[a-zA-z]+([\s][a-zA-Z]+)*$/, {
      message: "Please Enter Valid Name ",
    }),
  address: yup.string().required("Please Enter Address"),
  age: yup
    .string()
    .required("Please Enter Age")
    .matches(/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/, {
      message: "Enter Valid Age 0-200",
      excludeEmptyString: true,
    }),
  email: yup
    .string()
    .email("Enter Valid Email")
    .required("Please Enter Email")
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      { message: "Enter Valid Email", excludeEmptyString: true }
    ),

  occupation: yup.string().required("Please Enter Occupation"),
  religion: yup.string().required("*"),
  marital: yup.string().required("*"),
  bloodgroup: yup.string().required("*"),
  nationality: yup.string().required("*"),
  idType: yup.string().required("*"),
  govtId: yup.string().when("idType", {
    is: "Aadhar",
    then: () => yup.string().matches(/^\d{12}$/, "Enter Valid Govt ID"),
    otherwise: () =>
      yup.string().matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Enter Valid Govt ID"),
  }),
  pincode: yup
    .string()
    .required("Enter Pincode")
    .matches(/^[1-9][0-9]{5}$/, {
      message: "Enter Valid Pincode",
      excludeEmptyString: true,
    }),
  Emergency_Contact: yup
    .string()
    .required("Please Enter Emergency Contact")
    .matches(/^[6-9]{1}[0-9]{9}$/, {
      message: "Enter Valid 10 digit Contact",
      excludeEmptyString: true,
    }),
});

const GuardianType = React.forwardRef(
  ({ onChange, onBlur, name, label }, ref) => (
    <>
      <label>{label}</label>
      <select name={name} ref={ref} onChange={onChange} onBlur={onBlur}>
        <option value="">Select Guardian</option>
        <option value="Father">Father</option>
        <option value="Mother">Mother</option>
      </select>
    </>
  )
);

const Select = React.forwardRef(({ onChange, onBlur, name, label }, ref) => (
  <>
    <label>{label}</label>
    <select name={name} ref={ref} onChange={onChange} onBlur={onBlur}>
      <option value="">Select Gender</option>
      <option value="Male">Male</option>
      <option value="Female">Female</option>
    </select>
  </>
));

const GovtIdComponent = React.forwardRef(
  ({ onChange, onBlur, name, label }, ref) => {
    return (
      <div>
        <label>{label}</label>
        <select name={name} ref={ref} onChange={onChange} onBlur={onBlur}>
          <option value="">Select GovtID</option>
          <option value="Aadhar">Aadhar</option>
          <option value="PAN">PAN</option>
        </select>
      </div>
    );
  }
);

const Country = React.forwardRef(({ onChange, onBlur, name, label }, ref) => (
  <>
    <label>{label}</label>
    <select name={name} ref={ref} onChange={onChange} onBlur={onBlur}>
      <option value="">Select Country</option>

      <option value="INDIA">India</option>
      <option value="NEPAL">Nepal</option>
      <option value="USA">USA</option>
      <option value="MEXICO">MEXICO</option>
    </select>
  </>
));

const State = React.forwardRef(({ onChange, onBlur, name, label }, ref) => (
  <>
    <label>{label}</label>
    <select name={name} ref={ref} onChange={onChange} onBlur={onBlur}>
      <option value="">Select State</option>

      <option value="state1">State1</option>
      <option value="state2">State2</option>
      <option value="state3">State3</option>
      <option value="state4">State4</option>
    </select>
  </>
));

const City = React.forwardRef(({ onChange, onBlur, name, label }, ref) => (
  <>
    <label>{label}</label>
    <select name={name} ref={ref} onChange={onChange} onBlur={onBlur}>
      <option value="">Select City</option>

      <option value="city1">City1</option>
      <option value="city2">City2</option>
      <option value="city3">City3</option>
      <option value="city4">City4</option>
    </select>
  </>
));

const Religion = React.forwardRef(({ onChange, onBlur, name, label }, ref) => (
  <>
    <label>{label}</label>
    <select name={name} ref={ref} onChange={onChange} onBlur={onBlur}>
      <option value="">Select Religion</option>

      <option value="African Traditional &amp; Diasporic">
        African Traditional &amp; Diasporic
      </option>
      <option value="Agnostic">Agnostic</option>
      <option value="Atheist">Atheist</option>
      <option value="Baha'i">Baha'i</option>
      <option value="Buddhism">Buddhism</option>
      <option value="Cao Dai">Cao Dai</option>
      <option value="Chinese traditional religion">
        Chinese traditional religion
      </option>
      <option value="Christianity">Christianity</option>
      <option value="Hinduism">Hinduism</option>
      <option value="Islam">Islam</option>
      <option value="Jainism">Jainism</option>
      <option value="Juche">Juche</option>
      <option value="Judaism">Judaism</option>
      <option value="Neo-Paganism">Neo-Paganism</option>
      <option value="Nonreligious">Nonreligious</option>
      <option value="Rastafarianism">Rastafarianism</option>
      <option value="Secular">Secular</option>
      <option value="Shinto">Shinto</option>
      <option value="Sikhism">Sikhism</option>
      <option value="Spiritism">Spiritism</option>
      <option value="Tenrikyo">Tenrikyo</option>
      <option value="Unitarian-Universalism">Unitarian-Universalism</option>
      <option value="Zoroastrianism">Zoroastrianism</option>
      <option value="primal-indigenous">primal-indigenous</option>
    </select>
  </>
));

const Marital = React.forwardRef(({ onChange, onBlur, name, label }, ref) => (
  <>
    <label>{label}</label>
    <select name={name} ref={ref} onChange={onChange} onBlur={onBlur}>
      <option value="">Select Marital Status</option>

      <option value="Single">Single</option>
      <option value="Married">Married</option>
    </select>
  </>
));

const BloodGroup = React.forwardRef(
  ({ onChange, onBlur, name, label }, ref) => (
    <>
      <label>{label}</label>
      <select name={name} ref={ref} onChange={onChange} onBlur={onBlur}>
        <option value="">Select BloodGroup</option>

        <option value="A+">A RhD positive (A+)</option>
        <option value="A-">A RhD negative (A-)</option>
        <option value="B+">B RhD positive (B+)</option>
        <option value="B-">B RhD positive (B-)</option>
        <option value="O+">O RhD positive (O+)</option>
        <option value="O-">O RhD positive (O-)</option>
        <option value="AB+">AB RhD positive (AB+)</option>
        <option value="AB-">AB RhD positive (AB-)</option>
      </select>
    </>
  )
);

const Nationality = React.forwardRef(
  ({ onChange, onBlur, name, label }, ref) => (
    <>
      <label>{label}</label>
      <select name={name} ref={ref} onChange={onChange} onBlur={onBlur}>
        <option value="">Select Nationality</option>

        <option value="INDIA">India</option>
        <option value="NEPAL">Nepal</option>
        <option value="USA">USA</option>
        <option value="MEXICO">MEXICO</option>
      </select>
    </>
  )
);

function Form() {
  const UserDataInfo = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SignupSchema),
  });

  const addUser = async (data) => {
    await axios.post("http://localhost:3004/UserData", data).then((res) => {
      console.log(res.data);
      UserDataInfo.setD([...UserDataInfo.data, res.data]);
    });
  };
  const onSubmit = (data) => {
    alert(JSON.stringify(data));
    console.log(data);
    addUser(data);
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <h3>Personal Details</h3>
      <div className="main">
        <div className="type">
          <label>Name</label>
          <div>
            <input {...register("Name")} placeholder="Enter Name" />
            {errors.Name && <p>{errors.Name.message}</p>}
          </div>
        </div>
        <div>
          <div className="type">
            <label>Age</label>
            <div>
              <input
                type="number"
                {...register("age", {
                  valueAsNumber: true,
                })}
                placeholder="Enter Age"
              />
              {errors.age && <p>{errors.age.message}</p>}
            </div>
          </div>
        </div>
        <div className="type">
          <div className="type">
            <Select label="Sex" {...register("sex")} />
            {errors.sex && <p>{errors.sex.message}</p>}
          </div>
        </div>
        <div className="type">
          <div className="type">
            <GovtIdComponent {...register("idType")} label="Government ID" />
            {errors.idType && <p>{errors.idType.message}</p>}
            <div>
              <input type="text" {...register("govtId")} />
              {errors.govtId && <p>{errors.govtId.message}</p>}
            </div>
          </div>
        </div>
      </div>
      <h3>Contact Details</h3>
      <div className="main">
        <div className="type">
          <div className="type">
            <GuardianType label="Guardian Details" {...register("guardian")} />
            {errors.guardian && <p>{errors.guardian.message}</p>}
          </div>

          <div>
            <input {...register("guardian_name")} placeholder="Guardian Name" />
            {errors.guardian_name && <p>{errors.guardian_name.message}</p>}
          </div>
        </div>
        <div className="type">
          <label>Email</label>
          <div>
            <input
              type="email"
              {...register("email", {
                pattern:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Enter Valid Email",
              })}
              placeholder="Enter Email"
            />
            {errors.email && <p>{errors.email.message}</p>}
          </div>
        </div>
        <div className="type">
          <label>Emergency Contact</label>
          <div>
            <input
              type="number"
              {...register("Emergency_Contact")}
              placeholder="Enter Emergency Contact"
            />
            {errors.Emergency_Contact && (
              <p>{errors.Emergency_Contact.message}</p>
            )}
          </div>
        </div>
      </div>

      <h3>Address Details</h3>
      <div className="main">
        <div className="type">
          <label>Address</label>
          <div>
            <input {...register("address")} placeholder="Enter Address" />
            {errors.address && <p>{errors.address.message}</p>}
          </div>
        </div>
        <div className="type">
          <Country label="Country" {...register("country")} />
          {errors.country && <p>{errors.country.message}</p>}
        </div>
        <div className="type">
          <State label="State" {...register("state")} />
          {errors.state && <p>{errors.state.message}</p>}
        </div>
        <div className="type">
          <City label="City" {...register("city")} />
          {errors.city && <p>{errors.city.message}</p>}
        </div>
        <div className="type">
          <label>Pincode</label>
          <div>
            <input
              type="number"
              {...register("pincode")}
              placeholder="Enter Pincode"
            />
            {errors.pincode && <p>{errors.pincode.message}</p>}
          </div>
        </div>
      </div>

      <h3>Other Details</h3>
      <div className="typeholder">
        <div className="type-2">
          <label>Occupation</label>
          <div>
            <input {...register("occupation")} placeholder="Enter Occupation" />
            {errors.occupation && <p>{errors.occupation.message}</p>}
          </div>
        </div>
        <div className="type-2">
          <Religion label="Religion" {...register("religion")} />
          {errors.religion && <p>{errors.religion.message}</p>}
        </div>
        <div className="type-2">
          <Marital label="Marital" {...register("marital")} />
          {errors.marital && <p>{errors.marital.message}</p>}
        </div>
        <div className="type-2">
          <BloodGroup label="BloodGroup" {...register("bloodgroup")} />
          {errors.bloodgroup && <p>{errors.bloodgroup.message}</p>}
        </div>
        <div className="type-2">
          <Nationality label="Nationality" {...register("nationality")} />
          {errors.nationality && <p>{errors.nationality.message}</p>}
        </div>
      </div>
      <div className="main-2">
        <input type="submit" />
      </div>
    </form>
  );
}

export default Form;

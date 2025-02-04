"use client";
import React, { Fragment, useContext, useEffect, useState } from "react";
import Button from "../../Button";

import { getAllCohort } from "@/utils/cohort";
import { getAllInstitution } from "@/utils/institution";
import { fileUploadhandler } from "@/utils/fileupload";

const FellowForm = ({ type, fellowDetails, handleFormSubmission }) => {
  let fellow = {};

  if (fellowDetails.fellow) {
    fellow = { ...fellowDetails.fellow };
  }
  const [initialData, setInitialData] = useState({
    cohorts: [{ id: "", cohort: "Default" }],
    institutions: [{ id: "", name: "Default" }],
  });

  const [formFields, setFormFields] = useState({
    name: {
      surname: fellow.name ? fellow.name.surname : "",
      firstname: fellow.name ? fellow.name.firstname : "",
      othername: fellow.name ? fellow.name.othername : "",
    },
    sex: fellow.sex ? fellow.sex : "male",
    email: fellow.email ? fellow.email : "",
    profileImg: {
      url: fellow.profileImg ? fellow.profileImg.url : "",
      name: fellow.profileImg ? fellow.profileImg.name : "",
    },
    shortBio: fellow.shortBio ? fellow.shortBio : "",
    cohortId: fellow.cohortId ? fellow.cohortId : "",
    CARTAGraduate: fellow.CARTAGraduate ? fellow.CARTAGraduate : "Yes",
    institutionId: fellow.institutionId ? fellow.institutionId : "",
    faculty: fellow.faculty ? fellow.faculty : "",
    department: fellow.department ? fellow.department : "",
    currentLevel: fellow.currentLevel ? fellow.currentLevel : "",
    PhDResearchTitle: fellow.PhDResearchTitle ? fellow.PhDResearchTitle : "",
    PhDResearchInstitute: fellow.PhDResearchInstitute
      ? fellow.PhDResearchInstitute
      : "",
    areaOfSpecialization: fellow.areaOfSpecialization
      ? fellow.areaOfSpecialization
      : "",
    researchInterest: fellow.researchInterest ? fellow.researchInterest : "",
    ORCIDNumber: fellow.ORCIDNumber ? fellow.ORCIDNumber : "",
    googleScholarProfile: fellow.googleScholarProfile
      ? fellow.googleScholarProfile
      : "",
    researchGateProfile: fellow.researchGateProfile
      ? fellow.researchGateProfile
      : "",
  });

  async function handleFileUpload(event) {
    if (!event.target.files || event.target.files.length === 0) {
      return; // User canceled file selection
    }
    const files = event.target.files;
    const formData = new FormData();

    for (const file of Array.from(files)) {
      formData.append("files", file);
    }

    const response = await fileUploadhandler(formData);

    if (!response.status) {
      console.log("error");
      // SetErrorMessage({ ...errors, photoUpload: "Error uploading picture" });
    }

    setFormFields({
      ...formFields,
      profileImg: {
        ...formFields.profileImg,
        url: response?.img_url,
        name: response?.name,
      },
    });
    // SetErrorMessage({ ...errors, photoUpload: "" });
  }
  useEffect(() => {
    const getInitialData = async () => {
      let data = {};

      await getAllCohort()
        .then(async (response1) => {
          const response2 = await getAllInstitution();
          data = {
            ...data,
            cohorts: [...initialData.cohorts, ...response1.cohorts],
            institutions: [
              ...initialData.institutions,
              ...response2.institutions,
            ],
          };
        })
        .then(() => {});

      setInitialData({ ...data });
    };

    getInitialData();
  }, []);

  return (
    <Fragment>
      <div className="w-full flex flex-col gap-5 ">
        <div className="flex flex-col w-full gap-5">
          <h3 className="font-bold text-black border-b-2 pb-2">
            Personal Details
          </h3>
          <div className="flex flex-col gap-3">
            <p className="font-semibold">Name:</p>
            <div className=" flex flex-col md:flex-row gap-5 w-full">
              <label htmlFor="surname" className="w-full text-xs">
                <input
                  type="text"
                  id="surname"
                  name="surname"
                  placeholder="Enter your surname"
                  value={formFields.name.surname}
                  onChange={(e) =>
                    setFormFields({
                      ...formFields,
                      name: {
                        ...formFields.name,
                        surname: e.target.value,
                      },
                    })
                  }
                  className="outline-none border-2 w-full p-2 rounded-sm shadow-sm mb-2 text-sm"
                />
                <br />
                Surname
              </label>
              <label htmlFor="firstname" className="w-full text-xs">
                <input
                  type="text"
                  id="firstname"
                  name="firstname"
                  placeholder="Enter your firstname"
                  value={formFields.name.firstname}
                  onChange={(e) =>
                    setFormFields({
                      ...formFields,
                      name: { ...formFields.name, firstname: e.target.value },
                    })
                  }
                  className="outline-none border-2 w-full p-2 rounded-sm shadow-sm mb-2 text-sm"
                />
                <br />
                Firstname
              </label>
              <label htmlFor="othername" className="w-full text-xs">
                <input
                  type="text"
                  id="othername"
                  name="othername"
                  placeholder="Enter your othername"
                  value={formFields.name.othername}
                  onChange={(e) =>
                    setFormFields({
                      ...formFields,
                      name: { ...formFields.name, othername: e.target.value },
                    })
                  }
                  className="outline-none border-2 w-full p-2 rounded-sm shadow-sm mb-2 text-sm"
                />
                <br />
                Other name
              </label>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex flex-col gap-5 w-full md:w-2/3">
              <div className="flex flex-col gap-3 ">
                <label className="font-semibold" htmlFor="sex">
                  Sex:
                </label>
                <select
                  id="sex"
                  value={formFields.sex}
                  onChange={(e) =>
                    setFormFields({ ...formFields, sex: e.target.value })
                  }
                  className="border-2 rounded-sm shadow-sm p-2 w-2/3"
                >
                  {["Male", "Female"].map((sex, index) => (
                    <option key={index} value={sex.toLowerCase()}>
                      {sex}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-3 w-full md:w-2/3">
                <label className="font-semibold" htmlFor="email">
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formFields.email}
                  onChange={(e) =>
                    setFormFields({
                      ...formFields,
                      email: e.target.value,
                    })
                  }
                  required
                  className="outline-none border-2 w-full p-2 rounded-sm shadow-sm mb-2 text-sm"
                />
              </div>
              <label className="font-semibold" htmlFor="bio">
                Please provide a brief bio about yourself ( Kindly include
                updates on your activities ; past, current and future. This
                should include individual activities and group activities,
                research, grants, conferences, etc (Maximum 150 words))
              </label>
            </div>
            <div className="flex flex-col gap-2 justify-center items-center p-12  md:w-1/3 border-dotted border-2">
              {formFields.profileImg.url.length > 0 && (
                <div className="w-[80px] h-[80px] bg-blue-800">
                  <img
                    src={formFields.profileImg.url}
                    className="object-cover w-full h-full rounded-sm"
                    alt={formFields.profileImg.name}
                  />
                </div>
              )}
              <div className="relative hover:cursor-pointer cursor-pointer">
                {!formFields.profileImg.url.length > 0 ? (
                  <p className="bg-primary_color text-secondary_text_color text-xl mt-2 p-2 border border-transparent hover:bg-transparent hover:border-primary_color hover:text-primary_color smooth_transition rounded-md ">
                    Upload photo
                  </p>
                ) : (
                  <p>{formFields.profileImg.name}</p>
                )}
                <input
                  className={` absolute  top-5  -translate-x-[5%] ${
                    formFields.profileImg.url.length > 0 && "hidden"
                  } cursor-pointer opacity-0 hover:cursor-pointer`}
                  type="file"
                  name="file_upload"
                  onChange={(event) => handleFileUpload(event)}
                  multiple={false}
                />
              </div>
              {formFields.profileImg.url.length > 0 && (
                <p
                  className="text-sm cursor-pointer text-red-700 hover:underline hover:underline-offset-2"
                  onClick={() => {
                    setFormFields({
                      ...formFields,
                      profileImg: {
                        ...formFields.profileImg,
                        url: "",
                        name: "",
                      },
                    });
                  }}
                >
                  Remove picture
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-3 ">
            <textarea
              id="bio"
              name="bio"
              value={formFields.shortBio}
              onChange={(e) =>
                setFormFields({ ...formFields, shortBio: e.target.value })
              }
              className="border-2 shadow-sm rounded-sm outline-none"
              rows="10"
            ></textarea>
          </div>
        </div>
        <div className="flex flex-col w-full gap-5">
          <h3 className="font-bold text-black border-b-2 pb-2">
            Your CARTA Details
          </h3>

          <div className="flex flex-col gap-3 ">
            <label className="font-semibold" htmlFor="cohort">
              Cohort:
            </label>
            <select
              id="cohort"
              value={formFields.cohortId}
              onChange={(e) =>
                setFormFields({ ...formFields, cohortId: e.target.value })
              }
              className="border-2 rounded-sm shadow-sm p-2 w-2/3 capitalize"
            >
              {initialData.cohorts.map((cohort, index) => (
                <option key={index} value={cohort.id}>
                  {cohort.cohort}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-3 ">
            <label className="font-semibold" htmlFor="CARTAGraduate">
              CARTA Gradute?:
            </label>
            <select
              id="CARTAGraduate"
              value={formFields.CARTAGraduate}
              onChange={(e) =>
                setFormFields({
                  ...formFields,
                  CARTAGraduate: e.target.value,
                })
              }
              className="border-2 rounded-sm shadow-sm p-2 w-2/3"
            >
              {["Yes", "No"].map((grad, index) => (
                <option key={index} value={grad}>
                  {grad}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex flex-col w-full gap-5">
          <h3 className="font-bold text-black border-b-2 pb-2">
            Professional/Academic Details
          </h3>

          <div className="flex flex-col gap-3 ">
            <label className="font-semibold" htmlFor="university">
              University:
            </label>
            <select
              id="university"
              value={formFields.institutionId}
              onChange={(e) =>
                setFormFields({ ...formFields, institutionId: e.target.value })
              }
              className="border-2 rounded-sm shadow-sm p-2 w-2/3 capitalize"
            >
              {initialData.institutions.map((university, index) => (
                <option key={index} value={university.id}>
                  {university.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-3 ">
            <label className="font-semibold" htmlFor="faculty">
              Faculty:
            </label>
            <input
              type="text"
              id="faculty"
              name="faculty"
              placeholder="Enter your faculty"
              value={formFields.faculty}
              onChange={(e) =>
                setFormFields({
                  ...formFields,
                  faculty: e.target.value,
                })
              }
              className="outline-none border-2 md:w-2/3 p-2 rounded-sm shadow-sm mb-2 text-sm"
            />
          </div>
          <div className="flex flex-col gap-3 ">
            <label className="font-semibold" htmlFor="department">
              Department:
            </label>
            <input
              type="text"
              id="department"
              name="department"
              placeholder="Enter your department"
              value={formFields.department}
              onChange={(e) =>
                setFormFields({
                  ...formFields,
                  department: e.target.value,
                })
              }
              className="outline-none border-2 md:w-2/3 p-2 rounded-sm shadow-sm mb-2 text-sm"
            />
          </div>
          <div className="flex flex-col gap-3 ">
            <label className="font-semibold" htmlFor="currentLevel">
              Current Level:
            </label>
            <input
              type="text"
              id="currentLevel"
              name="currentLevel"
              placeholder="Enter your current level"
              value={formFields.currentLevel}
              onChange={(e) =>
                setFormFields({
                  ...formFields,
                  currentLevel: e.target.value,
                })
              }
              className="outline-none border-2 md:w-2/3 p-2 rounded-sm shadow-sm mb-2 text-sm"
            />
          </div>
          <div className="flex flex-col gap-3 ">
            <label className="font-semibold" htmlFor="PhDResearchTitle">
              Title of PhD research:
            </label>
            <input
              type="text"
              id="PhDResearchTitle"
              name="PhDResearchTitle"
              placeholder="Enter your PhD Research Title"
              value={formFields.PhDResearchTitle}
              onChange={(e) =>
                setFormFields({
                  ...formFields,
                  PhDResearchTitle: e.target.value,
                })
              }
              className="outline-none border-2 md:w-2/3 p-2 rounded-sm shadow-sm mb-2 text-sm"
            />
          </div>
          <div className="flex flex-col gap-3 ">
            <label className="font-semibold" htmlFor="PhDResearchInstitute">
              Institution where PhD is registered/Year:
            </label>
            <input
              type="text"
              id="PhDResearchInstitute"
              name="PhDResearchInstitute"
              placeholder="e.g Obafemi Awolowo University/2019"
              value={formFields.PhDResearchInstitute}
              onChange={(e) =>
                setFormFields({
                  ...formFields,
                  PhDResearchInstitute: e.target.value,
                })
              }
              className="outline-none border-2 md:w-2/3 p-2 rounded-sm shadow-sm mb-2 text-sm"
            />
          </div>
          <div className="flex flex-col gap-3 ">
            <label className="font-semibold" htmlFor="areaOfSpecialization">
              Area of specialization:
            </label>
            <p className="text-xs">
              Enter your areas of specialization, separated by commas:
            </p>
            <input
              type="text"
              id="areaOfSpecialization"
              name="areaOfSpecialization"
              value={formFields.areaOfSpecialization}
              onChange={(e) =>
                setFormFields({
                  ...formFields,
                  areaOfSpecialization: e.target.value,
                })
              }
              className="outline-none border-2 md:w-2/3 p-2 rounded-sm shadow-sm mb-2 text-sm"
            />
          </div>
          <div className="flex flex-col gap-3 ">
            <label className="font-semibold" htmlFor="researchInterest">
              Research interest:
            </label>
            <p className="text-xs">
              Enter your research interest, separated by commas:
            </p>
            <input
              type="text"
              id="researchInterest"
              name="researchInterest"
              value={formFields.researchInterest}
              onChange={(e) =>
                setFormFields({
                  ...formFields,
                  researchInterest: e.target.value,
                })
              }
              className="outline-none border-2 md:w-2/3 p-2 rounded-sm shadow-sm mb-2 text-sm"
            />
          </div>
        </div>
        <div className="flex flex-col w-full gap-5">
          <h3 className="font-bold text-black border-b-2 pb-2">Other Links</h3>
          <div className="flex flex-col gap-3 ">
            <label className="font-semibold" htmlFor="ORCIDNumber">
              ORCID Number
            </label>
            <input
              type="text"
              id="ORCIDNumber"
              name="ORCIDNumber"
              placeholder="Enter your ORCID Number"
              value={formFields.ORCIDNumber}
              onChange={(e) =>
                setFormFields({
                  ...formFields,
                  ORCIDNumber: e.target.value,
                })
              }
              className="outline-none border-2 md:w-2/3 p-2 rounded-sm shadow-sm mb-2 text-sm"
            />
          </div>
          <div className="flex flex-col gap-3 ">
            <label className="font-semibold" htmlFor="googleScholarProfile">
              Google Scholar link
            </label>
            <input
              type="text"
              id="googleScholarProfile"
              name="googleScholarProfile"
              placeholder="Enter your Google Scholar link"
              value={formFields.googleScholarProfile}
              onChange={(e) =>
                setFormFields({
                  ...formFields,
                  googleScholarProfile: e.target.value,
                })
              }
              className="outline-none border-2 md:w-2/3 p-2 rounded-sm shadow-sm mb-2 text-sm"
            />
          </div>
          <div className="flex flex-col gap-3 ">
            <label className="font-semibold" htmlFor="researchGateProfile">
              ResearchGate link
            </label>
            <input
              type="text"
              id="researchGateProfile"
              name="researchGateProfile"
              placeholder="Enter your ResearchGate links"
              value={formFields.researchGateProfile}
              onChange={(e) =>
                setFormFields({
                  ...formFields,
                  researchGateProfile: e.target.value,
                })
              }
              className="outline-none border-2 md:w-2/3 p-2 rounded-sm shadow-sm mb-2 text-sm"
            />
          </div>
        </div>
        <div className="">
          <Button handleButtonClick={() => handleFormSubmission(formFields)}>
            {type ? "Update Fellow" : "Add Fellow"}
          </Button>
        </div>
      </div>
    </Fragment>
  );
};

export default FellowForm;

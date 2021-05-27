import {useEffect, useState} from "react";
import SignatureCanvas from 'react-signature-canvas';
import axios from 'axios';

const url = 'https://script.google.com/macros/s/AKfycbzZNfyFSydpt_rEwqUuSo88B1-6s-aenB07LR8KRQrVN702jlWgmXOnP2KKWarFL-g';
axios.defaults.baseURL = url;

function App() {
  const [drawSignature, setDrawSignature] = useState(false);
  const [signaturePad, setSignaturePad] = useState(null);
  const [roles, setRoles] = useState([]);
  const [projectOwners, setProjectOwners] = useState([]);
  const [approvers, setApprovers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = () => {
    axios.get('/exec?table=role').then(({data: roles}) => setRoles(roles));
    axios.get('/exec?table=project-owner').then(({data: projectOwners}) => setProjectOwners(projectOwners));
    axios.get('/exec?table=approver').then(({data: approvers}) => setApprovers(approvers));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!signaturePad) console.log('No signature pad');
    const data = {};
    for (let i = 0; i < e.target.length; i++) {
      const key = e.target[i].name, value = e.target[i][e.target[i].type === 'checkbox' ? 'checked' : 'value'];
      if (key) data[key] = value;
    }
    axios.post('/exec', data).then(() => setLoading(false))
  };

  useEffect(() => {
    fetchData().catch(console.error)
  }, [])

  return (
    <div className='container m-auto bg-gray-100 p-10 rounded-xl'>
      <form onSubmit={handleSubmit}>

        {loading && 'Loading...'}

        <div className="mt-10 sm:mt-0">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Personal Information</h3>
                <p className="mt-1 text-sm text-gray-600">Use a permanent address where you can receive mail.</p>
              </div>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
                <div className="shadow overflow-hidden sm:rounded-md">
                  <div className="px-4 py-5 bg-white sm:p-6">
                    <div className="grid grid-cols-6 gap-6">

                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                          First name
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          id="firstName"
                          autoComplete="given-name"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                          Last name
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          id="lastName"
                          autoComplete="family-name"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-4">
                        <label htmlFor="nik" className="block text-sm font-medium text-gray-700">
                          NIK
                        </label>
                        <input
                          type="text"
                          name="nik"
                          id="nik"
                          autoComplete="nik"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                          Email
                        </label>
                        <input
                          type="text"
                          name="email"
                          id="email"
                          autoComplete="email"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                          WhatsApp
                        </label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                          <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                              +62
                          </span>
                          <input
                            type="text"
                            name="phone"
                            id="phone"
                            autoComplete="phone"
                            className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                          />
                        </div>
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                          Role <span className='bg-blue-700 text-xs text-white rounded-full px-2 py-1'>Add New Role</span>
                        </label>
                        <select
                          id="role"
                          name="role"
                          autoComplete="role"
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                          {roles.map(role => (
                            <option value={role} key={role}>{role}</option>
                          ))}
                        </select>
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="workspace" className="block text-sm font-medium text-gray-700">
                          Workspace / Area
                        </label>
                        <input
                          type="text"
                          name="workspace"
                          id="workspace"
                          autoComplete="workspace"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div className="col-span-6">
                        <label htmlFor="projectName" className="block text-sm font-medium text-gray-700">
                          Project Name
                        </label>
                        <input
                          type="text"
                          name="projectName"
                          id="projectName"
                          autoComplete="project-name"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-6 lg:col-span-3">
                        <label htmlFor="projectOwner" className="block text-sm font-medium text-gray-700">
                          Project Owner <span className='bg-blue-700 text-xs text-white rounded-full px-2 py-1'>Add New Owner</span>
                        </label>
                        <select
                          id="projectOwner"
                          name="projectOwner"
                          autoComplete="projectOwner"
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                          {projectOwners.map(projectOwner => (
                            <option value={projectOwner} key={projectOwner}>{projectOwner}</option>
                          ))}
                        </select>
                      </div>

                      <div className="col-span-6 sm:col-span-3 lg:col-span-3">
                        <label htmlFor="approver" className="block text-sm font-medium text-gray-700">
                          Approved By <span className='bg-blue-700 text-xs text-white rounded-full px-2 py-1'>Add New Approver</span>
                        </label>
                        <select
                          id="approver"
                          name="approver"
                          autoComplete="approver"
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                          {approvers.map(approver => (
                            <option value={approver} key={approver}>{approver}</option>
                          ))}
                        </select>
                      </div>

                      <div className="col-span-6 sm:col-span-6 lg:col-span-6">
                        <label className="block text-sm font-medium text-gray-700">
                          Signature <span className='bg-indigo-500 text-xs text-white rounded-full px-2 py-1'>Soon</span>
                        </label>
                        <div className="flex space-x-2 text-sm justify-center">
                          <button className={`h-9 flex items-center justify-center rounded-full px-3 my-2 focus:outline-none ${!drawSignature && 'bg-gray-200 border-2 border-gray-300'}`} onClick={() => setDrawSignature(false)} type='button'>Upload</button>
                          <button className={`h-9 flex items-center justify-center rounded-full px-3 my-2 focus:outline-none ${drawSignature && 'bg-gray-200 border-2 border-gray-300'}`} onClick={() => setDrawSignature(true)} type='button'>Draw</button>
                        </div>
                        <div className="mt-1 flex justify-center border-2 border-gray-300 border-dashed rounded-md">
                          {drawSignature ? (
                            <div className='border-2 border-gray-200'>
                              <SignatureCanvas ref={setSignaturePad} />
                            </div>
                          ) : (
                            <div className="space-y-1 text-center p-7">
                              <svg
                                className="mx-auto h-12 w-12 text-gray-400"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 48 48"
                                aria-hidden="true"
                              >
                                <path
                                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              <div className="flex text-sm text-gray-600">
                                <label
                                  htmlFor="file-upload"
                                  className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                >
                                  <span>Upload a file</span>
                                  <input id="file-upload" name="signature" type="file" className="sr-only"/>
                                </label>
                                <p className="pl-1">or drag and drop</p>
                              </div>
                              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                            </div>
                          )}
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
            </div>
          </div>
        </div>

        <div className="hidden sm:block" aria-hidden="true">
          <div className="py-5">
            <div className="border-t border-gray-200" />
          </div>
        </div>

        <div className="mt-10 sm:mt-0">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Notifications</h3>
                <p className="mt-1 text-sm text-gray-600">Decide which communications you'd like to receive and how.</p>
              </div>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
                <div className="shadow overflow-hidden sm:rounded-md">
                  <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                    <fieldset>
                      <legend className="text-base font-medium text-gray-900">Send File to</legend>
                      <div className="mt-4 space-y-4">
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="sendByEmail"
                              name="sendByEmail"
                              type="checkbox"
                              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="sendByEmail" className="font-medium text-gray-700">
                              Email
                            </label>
                            <p className="text-gray-500">Send attendance file to my Email.</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="sendByWhatsApp"
                              name="sendByWhatsApp"
                              type="checkbox"
                              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="sendByWhatsApp" className="font-medium text-gray-700">
                              WhatsApp <span className='bg-indigo-500 text-xs text-white rounded-full px-2 py-1'>Experimental</span>
                            </label>
                            <p className="text-gray-500">Send attendance file to my WhatsApp.</p>
                          </div>
                        </div>
                      </div>
                    </fieldset>
                    <fieldset>
                      <div>
                        <legend className="text-base font-medium text-gray-900">Get Reminder</legend>
                        <p className="text-sm text-gray-500">Get reminder every month to your inbox.</p>
                      </div>
                      <div className="mt-4 space-y-4">
                        <div className="flex items-center">
                          <input
                            id="emailReminder"
                            name="emailReminder"
                            type="checkbox"
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                          />
                          <label htmlFor="emailReminder" className="ml-3 block text-sm font-medium text-gray-700">
                            Email
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="whatsAppReminder"
                            name="whatsAppReminder"
                            type="checkbox"
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                          />
                          <label htmlFor="whatsAppReminder" className="ml-3 block text-sm font-medium text-gray-700">
                            WhatsApp
                          </label>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                  <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button
                      type="submit"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Save
                    </button>
                  </div>
                </div>
            </div>
          </div>
        </div>

      </form>
    </div>
  );
}

export default App;

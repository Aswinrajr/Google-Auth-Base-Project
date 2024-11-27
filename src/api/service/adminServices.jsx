import { adminServices } from "../axiosInstance/adminService";

export const allowedDomain = async (domain) => {
  try {
    const response = await adminServices.post(`/auth/admin-allow-domain`, {
      domain,
    });
    return response;
  } catch (err) {
    return err;
  }
};

export const listDomains = async (domain) => {
  try {
    const response = await adminServices.get(`/auth/admin-domain-list`, {
      domain,
    });
    return response;
  } catch (err) {
    return err;
  }
};

export const deleteDomain = async (id) => {
  try {
    const response = await adminServices.delete(
      `/auth/admin-delete-domain/${id}`
    );
    return response;
  } catch (err) {
    return err;
  }
};


export const submitRequest = async (id,formData) => {
  try {
    const response = await adminServices.post(
      `/auth/create-request/${id}`,formData
    );
    return response;
  } catch (err) {
    return err;
  }
};


export const createNewVendor = async (formData) => {
  try {
    const response = await adminServices.post(
      `/auth/create-newvendor`,formData
    );
    return response;
  } catch (err) {
    return err;
  }
};


export const getVendorList = async () => {
  try {
    const response = await adminServices.get(
      `/vendors/get-all`
    );
    return response;
  } catch (err) {
    return err;
  }
};


export const deleteVendor = async (id) => {
  try {
    const response = await adminServices.delete(
      `/vendors/delete/${id}`
    );
    return response;
  } catch (err) {
    return err;
  }
};

export const deleteEmployee = async (id) => {
  try {
    const response = await adminServices.delete(
      `/employees/delete/${id}`
    );
    return response;
  } catch (err) {
    return err;
  }
};


export const generateEmployeeUniqueId = async () => {
  try {
    const response = await adminServices.get(
      `/employees/generate-empid`
    );
    return response;
  } catch (err) {
    return err;
  }
};


export const getEmployeeList = async () => {
  try {
    const response = await adminServices.get(
      `/employees/get-all`
    );
    return response;
  } catch (err) {
    return err;
  }
};


export const getAllEntityData = async () => {
  try {
    const response = await adminServices.get(
      `/entity/get-all`
    );
    return response;
  } catch (err) {
    return err;
  }
};

export const addEntityData = async (data) => {
  try {
    const response = await adminServices.post(
      `/entity/create`,{data}
    );
    return response;
  } catch (err) {
    return err;
  }
};

export const deleteEntity = async (id) => {
  try {
    const response = await adminServices.delete(
      `/entity/delete/${id}`
    );
    return response;
  } catch (err) {
    return err;
  }
};


export const createNewRequest = async (id,formData) => {
  try {
    console.log(id,formData)
    const response = await adminServices.post(
      `/employees/create-newrequest/${id}`,formData
    );
    return response;
  } catch (err) {
    return err;
  }
};


export const regNewEmployee = async (formData) => {
  try {
    const response = await adminServices.post(
      `/employees/create-new-employee`,formData
    );
    return response;
  } catch (err) {
    return err;
  }
};


export const getReqListEmployee = async (id,role) => {
  try {
    const response = await adminServices.get(
      `/employees/get-all-req/${id}`
    );
    return response;
  } catch (err) {
    return err;
  }
};
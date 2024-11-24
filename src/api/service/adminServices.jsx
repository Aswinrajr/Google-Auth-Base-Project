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
      `/auth/vendor-list`
    );
    return response;
  } catch (err) {
    return err;
  }
};


export const deleteVendor = async (id) => {
  try {
    const response = await adminServices.delete(
      `/auth/delete-vendor/${id}`
    );
    return response;
  } catch (err) {
    return err;
  }
};
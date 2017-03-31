import { expect } from "chai";
import { stub } from "sinon";

import * as React from "react";
import { shallow } from "enzyme";

import { AdminAuthServices } from "../AdminAuthServices";
import ErrorMessage from "../ErrorMessage";
import LoadingIndicator from "opds-web-client/lib/components/LoadingIndicator";
import AdminAuthServiceEditForm from "../AdminAuthServiceEditForm";

describe("AdminAuthServices", () => {
  let wrapper;
  let fetchAdminAuthServices;
  let editAdminAuthService;
  let adminAuthServicesData = [{
    name: "name",
    provider: "OAuth provider",
    url: "test.com",
    username: "user",
    password: "pass",
    domains: []
  }];

  const pause = () => {
    return new Promise<void>(resolve => setTimeout(resolve, 0));
  };

  beforeEach(() => {
    fetchAdminAuthServices = stub();
    editAdminAuthService = stub().returns(new Promise<void>(resolve => resolve()));

    wrapper = shallow(
      <AdminAuthServices
        adminAuthServices={adminAuthServicesData}
        fetchAdminAuthServices={fetchAdminAuthServices}
        editAdminAuthService={editAdminAuthService}
        csrfToken="token"
        isFetching={false}
        />
    );
  });

  it("shows error message", () => {
    let error = wrapper.find(ErrorMessage);
    expect(error.length).to.equal(0);
    let fetchError = { status: 400, response: "test error", url: "test url" };
    wrapper.setProps({ fetchError });
    error = wrapper.find(ErrorMessage);
    expect(error.length).to.equal(1);
  });

  it("shows loading indicator", () => {
    let loading = wrapper.find(LoadingIndicator);
    expect(loading.length).to.equal(0);
    wrapper.setProps({ isFetching: true });
    loading = wrapper.find(LoadingIndicator);
    expect(loading.length).to.equal(1);
  });

  it("shows admin auth service list", () => {
    let adminAuthService = wrapper.find("li");
    expect(adminAuthService.length).to.equal(1);
    expect(adminAuthService.text()).to.contain("name");
    let editLink = adminAuthService.find("a");
    expect(editLink.props().href).to.equal("/admin/web/config/adminAuth/edit/name");
  });

  it("shows create link", () => {
    let createLink = wrapper.find("div > a");
    expect(createLink.length).to.equal(1);
    expect(createLink.props().href).to.equal("/admin/web/config/adminAuth/create");
  });

  it("shows create form", () => {
    let form = wrapper.find(AdminAuthServiceEditForm);
    expect(form.length).to.equal(0);
    wrapper.setProps({ editOrCreate: "create" });
    form = wrapper.find(AdminAuthServiceEditForm);
    expect(form.length).to.equal(1);
    expect(form.props().adminAuthService).to.be.undefined;
    expect(form.props().csrfToken).to.equal("token");
    expect(form.props().disabled).to.equal(false);
  });

  it("shows edit form", () => {
    wrapper.setProps({ editOrCreate: "edit", identifier: "name" });
    let form = wrapper.find(AdminAuthServiceEditForm);
    expect(form.length).to.equal(1);
    expect(form.props().adminAuthService).to.equal(adminAuthServicesData[0]);
    expect(form.props().csrfToken).to.equal("token");
    expect(form.props().disabled).to.equal(false);
  });

  it("fetches admin auth services on mount and passes edit function to form", async () => {
    expect(fetchAdminAuthServices.callCount).to.equal(1);

    wrapper.setProps({ editOrCreate: "create" });
    let form = wrapper.find(AdminAuthServiceEditForm);

    expect(editAdminAuthService.callCount).to.equal(0);
    form.props().editAdminAuthService();
    expect(editAdminAuthService.callCount).to.equal(1);

    await pause();
    expect(fetchAdminAuthServices.callCount).to.equal(2);
  });
});
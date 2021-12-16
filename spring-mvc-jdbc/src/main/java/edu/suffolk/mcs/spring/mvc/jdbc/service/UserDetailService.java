package edu.suffolk.mcs.spring.mvc.jdbc.service;

import java.util.List;

import edu.suffolk.mcs.spring.mvc.jdbc.model.UserDetail;

public interface UserDetailService {

	public UserDetail getUserDetail(int id);

	public List<UserDetail> getAllUserDetail();

	public int addUserDetail(UserDetail userDetail);

	public int updateUserDetail(UserDetail userDetail);

	public int deleteUserDetail(int id);
}

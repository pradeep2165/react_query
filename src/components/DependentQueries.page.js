import React from "react";
import { useQuery } from "react-query";
import { axios } from "axios";

const fetchUserByEmail = (email) => {
  return axios.get(`http://localhost:4000/users/${email}`);
};
const fetchUserByChannelId = (channelId) => {
  return axios.get(`http://localhost:4000/channels/${channelId}`);
};
export const DependentQueriesPage = ({ email }) => {
  const { data: user } = useQuery(["user", email], () => fetchUserByEmail(email));

  const channelId = user?.data.channelId;

  useQuery(["courses", channelId], () => fetchUserByChannelId(channelId), {
    enabled: !!channelId,
  });
  return <div>Dependent Queries</div>;
};

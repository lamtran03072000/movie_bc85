import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { userService } from "../../../service/userService";
import { Space, Table, Tag } from "antd";

const AdminHomePage = () => {
  // tạo state

  const qc = useQueryClient();

  // phương thức post,delete,put thường dùng hook useMutation

  const { mutate } = useMutation({
    mutationFn: async (taiKhoan) => await userService.deleteUser(taiKhoan),
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["listUser"],
      });
    },
  });

  // phương thức get thường dùng hook useQuery

  const { data, error } = useQuery({
    queryKey: ["listUser"],
    queryFn: async () => await userService.getListUser(),
  });

  const listUser = data?.data?.content || [];
  console.log("listUser: ", listUser);

  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Họ Tên",
      dataIndex: "hoTen",
      key: "hoTen",
    },
    {
      title: "Mã Loại Người Dùng",
      dataIndex: "maLoaiNguoiDung",
      key: "maLoaiNguoiDung",
    },
    {
      title: "Tài Khoản",
      dataIndex: "taiKhoan",
      key: "taiKhoan",
    },
    {
      title: "Mật khẩu",
      dataIndex: "matKhau",
      key: "matKhau",
    },
    {
      title: "Số điện thoại",
      dataIndex: "soDT",
      key: "soDT",
    },
    {
      title: "Thao tác",
      // dataIndex: "soDT",
      // key: "soDT",
      render: (_, record) => {
        return (
          <div>
            <button
              onClick={() => {
                console.log("record", record.taiKhoan);
                mutate(record.taiKhoan);
              }}
              className="bg-red-500 p-2 rounded text-white"
            >
              Xoá
            </button>
            <button className="bg-purple-400 p-2 rounded text-white ml-2">
              Sửa
            </button>
          </div>
        );
      },
    },

    // {
    //   title: "Action",
    //   key: "action",
    //   render: (_, record) => (
    //     <Space size="middle">
    //       <a>Invite {record.name}</a>
    //       <a>Delete</a>
    //     </Space>
    //   ),
    // },
  ];

  return (
    <div className="px-10">
      <h3 className="h3">Danh sách user</h3>

      <Table columns={columns} dataSource={listUser} />
    </div>
  );
};

export default AdminHomePage;

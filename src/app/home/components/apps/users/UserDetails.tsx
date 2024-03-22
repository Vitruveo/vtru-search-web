import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";
import {
  IconPencil,
  IconStar,
  IconTrash,
  IconDeviceFloppy,
} from "@tabler/icons-react";

import { UserType } from "@/mock/users";
import BlankCard from "../../shared/BlankCard";
import Scrollbar from "../../custom-scroll/Scrollbar";
import emailIcon from "public/images/breadcrumb/emailSv.png";

export default function UserDetails() {
  const userDetail: UserType = {
    id: 1,
    firstname: "John",
    lastname: "Doe",
    image: "",
    department: "Development",
    company: "Vitruveo",
    phone: "+121 332 1212",
    email: "john.doe@email.com",
    address: "",
    notes:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s",
    frequentlycontacted: false,
    starred: false,
    deleted: false,
  };
  const editUser = false;

  const theme = useTheme();

  const warningColor = theme.palette.warning.main;

  const tableData = [
    {
      id: 1,
      title: "Firstname",
      alias: "firstname",
      gdata: userDetail ? userDetail.firstname : "",
      type: "text",
    },
    {
      id: 2,
      title: "Lastname",
      alias: "lastname",
      gdata: userDetail ? userDetail.lastname : "",
      type: "text",
    },
    {
      id: 3,
      title: "Company",
      alias: "company",
      gdata: userDetail ? userDetail.company : "",
      type: "text",
    },
    {
      id: 4,
      title: "Department",
      alias: "department",
      gdata: userDetail ? userDetail.department : "",
      type: "text",
    },
    {
      id: 5,
      title: "Email",
      alias: "email",
      gdata: userDetail ? userDetail.email : "",
      type: "email",
    },
    {
      id: 6,
      title: "Phone",
      alias: "phone",
      gdata: userDetail ? userDetail.phone : "",
      type: "phone",
    },
    {
      id: 7,
      title: "Address",
      alias: "address",
      gdata: userDetail ? userDetail.address : "",
      type: "text",
    },
    {
      id: 8,
      title: "Notes",
      alias: "notes",
      gdata: userDetail ? userDetail.notes : "",
      type: "text",
    },
  ];

  return (
    <>
      {userDetail && !userDetail.deleted ? (
        <>
          <Box p={3} py={2} display={"flex"} alignItems="center">
            <Typography variant="h5">User Details</Typography>
            <Stack gap={0} direction="row" ml={"auto"}>
              <Tooltip title={userDetail.starred ? "Unstar" : "Star"}>
                <IconButton>
                  <IconStar
                    stroke={1.3}
                    size="18"
                    style={{
                      fill: userDetail.starred ? warningColor : "",
                      stroke: userDetail.starred ? warningColor : "",
                    }}
                  />
                </IconButton>
              </Tooltip>
              <Tooltip title={editUser ? "Save" : "Edit"}>
                <IconButton>
                  {!editUser ? (
                    <IconPencil size="18" stroke={1.3} />
                  ) : (
                    <IconDeviceFloppy size="18" stroke={1.3} />
                  )}
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton>
                  <IconTrash size="18" stroke={1.3} />
                </IconButton>
              </Tooltip>
            </Stack>
          </Box>
          <Divider />

          <Box sx={{ overflow: "auto" }}>
            {!editUser ? (
              <Box>
                <Box p={3}>
                  <Box display="flex" alignItems="center">
                    <Avatar
                      alt={userDetail.image}
                      src={userDetail.image}
                      sx={{ width: "72px", height: "72px" }}
                    />
                    <Box sx={{ ml: 2 }}>
                      <Typography variant="h6" mb={0.5}>
                        {userDetail.firstname} {userDetail.lastname}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        mb={0.5}
                      >
                        {userDetail.department}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {userDetail.company}
                      </Typography>
                    </Box>
                  </Box>
                  <Grid container>
                    <Grid item lg={6} xs={12} mt={4}>
                      <Typography variant="body2" color="text.secondary">
                        Phone Number
                      </Typography>
                      <Typography variant="subtitle1" mb={0.5} fontWeight={600}>
                        {userDetail.phone}
                      </Typography>
                    </Grid>
                    <Grid item lg={6} xs={12} mt={4}>
                      <Typography variant="body2" color="text.secondary">
                        Email address
                      </Typography>
                      <Typography variant="subtitle1" fontWeight={600} mb={0.5}>
                        {userDetail.email}
                      </Typography>
                    </Grid>
                    <Grid item lg={12} xs={12} mt={4}>
                      <Typography variant="body2" color="text.secondary">
                        Address
                      </Typography>
                      <Typography variant="subtitle1" fontWeight={600} mb={0.5}>
                        {userDetail.address}
                      </Typography>
                    </Grid>
                    <Grid item lg={6} xs={12} mt={4}>
                      <Typography variant="body2" color="text.secondary">
                        Department
                      </Typography>
                      <Typography variant="subtitle1" mb={0.5} fontWeight={600}>
                        {userDetail.department}
                      </Typography>
                    </Grid>
                    <Grid item lg={6} xs={12} mt={4}>
                      <Typography variant="body2" color="text.secondary">
                        Company
                      </Typography>
                      <Typography variant="subtitle1" fontWeight={600} mb={0.5}>
                        {userDetail.company}
                      </Typography>
                    </Grid>
                    <Grid item lg={12} xs={12} mt={4}>
                      <Typography variant="body2" mb={1} color="text.secondary">
                        Notes
                      </Typography>
                      <Typography variant="subtitle1" mb={0.5}>
                        {userDetail.notes}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
                <Divider />
                <Box p={3} gap={1} display="flex">
                  <Button
                    color="primary"
                    variant="contained"
                    size="small"
                    onClick={() => {}}
                  >
                    Edit
                  </Button>
                  <Button
                    color="error"
                    variant="contained"
                    size="small"
                    onClick={() => {}}
                  >
                    Delete
                  </Button>
                </Box>
              </Box>
            ) : (
              <>
                <BlankCard sx={{ p: 0 }}>
                  <Scrollbar
                    sx={{ height: { lg: "calc(100vh - 360px)", md: "100vh" } }}
                  >
                    <Box pt={1}>
                      {tableData.map((data) => (
                        <Box key={data.id} px={3} py={1.5}>
                          <Typography
                            variant="subtitle1"
                            fontWeight={600}
                            mb={0.5}
                          >
                            {data.title}
                          </Typography>
                          <TextField
                            id="firstname"
                            size="small"
                            fullWidth
                            type="text"
                            value={data.gdata}
                            onChange={(e) => {}}
                          />
                        </Box>
                      ))}
                      <Box p={3}>
                        <Button
                          color="primary"
                          variant="contained"
                          onClick={() => {}}
                        >
                          Save User
                        </Button>
                      </Box>
                    </Box>
                  </Scrollbar>
                </BlankCard>
              </>
            )}
          </Box>
        </>
      ) : (
        <Box
          p={3}
          height="50vh"
          display={"flex"}
          justifyContent="center"
          alignItems={"center"}
        >
          <Box>
            <Typography variant="h4">Please Select a User</Typography>
            <br />
            <Image src={emailIcon} alt={"emailIcon"} width="250" />
          </Box>
        </Box>
      )}
    </>
  );
}

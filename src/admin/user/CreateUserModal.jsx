import { 
    Modal,
    TextField,
    MenuItem,
    useTheme,
    Box,
    Typography,
    Stack,
    Button,
} from "@mui/material";
import { useEffect, useState } from "react";


const defaultUser = {
    name: '',
    email: '',
    mobile: "",
    role: '',
    password: "",
    status: 'active',
};

const roles = ['admin', 'user'];

const CreateUserModal = ({ open, onClose, onSubmit, initialData }) => {
    const [user, setUser] = useState(initialData || defaultUser);
    const [errors, setErrors] = useState({});
    const theme = useTheme();

    useEffect(() => {
        setUser(initialData || defaultUser);
        setErrors({});
    }, [initialData, open]);

    const validate = () => {
        const errs = {};

        if (!user.name) errs.name = 'Name is required';
        if (!user.mobile) errs.mobile = 'Mobile is required';
        if (user.mobile && !/^\d{10}$/.test(user.mobile)) errs.mobile = 'Invalid mobile number';
        if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(user.email)) errs.email = 'Invalid email';
        if (!user.role) errs.role = 'Role is required';

        return errs;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        const errs = validate();
        setErrors(errs);
        if (Object.keys(errs).length === 0) {
            onSubmit(user);
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    p: 4,
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                    boxShadow: 24,
                    minWidth: 350,
                    maxWidth: 400,
                    mx: 'auto',
                    mt: '10vh',
                }}
            >
                <Typography variant="h6" mb={2}>
                    {initialData ? 'Update User' : 'Create User'}
                </Typography>
                <Stack spacing={2}>
                    <TextField
                        label="Name"
                        name="name"
                        value={user.name}
                        onChange={handleChange}
                        error={!!errors.name}
                        helperText={errors.name}
                        fullWidth
                    />
                    <TextField
                        label="Email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        error={!!errors.email}
                        helperText={errors.email}
                        fullWidth
                    />
                    <TextField
                        label="Mobile"
                        name="mobile"
                        value={user.mobile}
                        onChange={handleChange}
                        error={!!errors.mobile}
                        helperText={errors.mobile}
                        fullWidth 
                    />
                    <TextField
                        label="Password"
                        name="password"
                        type="password"
                        value={user.password}
                        onChange={handleChange}
                        error={!!errors.password}
                        helperText={errors.password}
                        fullWidth
                    />
                    <TextField
                        select
                        label="Role"
                        name="role"
                        value={user.role}
                        onChange={handleChange}
                        error={!!errors.role}
                        helperText={errors.role}
                        fullWidth
                    >
                        {roles.map((role) => (
                            <MenuItem key={role} value={role}>
                                {role.charAt(0).toUpperCase() + role.slice(1)}
                            </MenuItem>
                        ))}
                    </TextField>
                </Stack>
                <Stack direction="row" spacing={2} mt={3} justifyContent="flex-end">
                    <Button variant="outlined" onClick={onClose} color="primary">
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        sx={{ bgcolor: theme.palette.primary.main }}
                    >
                        {initialData ? 'Update User' : 'Create User'}
                    </Button>
                </Stack>
            </Box>
        </Modal>
    );
}

export default CreateUserModal;
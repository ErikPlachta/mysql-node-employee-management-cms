INSERT INTO Department (id, name)
    VALUES
        ('01', 'Director'),
        ('02', 'Tech Support'),
        ('03', 'Sales'),
        ('04', 'Customer Success'),
        ('05', 'Development');

INSERT INTO Role (id, title, salary, department_id)
VALUES
    ('01', 'Director'),
    ('02', 'Tech Support'),
    ('03', 'Sales'),
    ('04', 'Customer Success'),
    ('05', 'Development');

INSERT INTO Employee (id, first_name, last_name, role_id, manager_id)
VALUES
    ('01', 'Director', 'Employee','01', NULL),
    ('02', 'Sales','Manager','02','01'),
    ('03', 'Tech','Manager','03','01'),
    ('04', 'Customer Success','Manager','04','01'),
    ('04', 'Development','Manager','05','01');
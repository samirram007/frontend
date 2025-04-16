

import DefaultLayout from "@/core/layouts/DefaultLayout";
import { Dashboard } from "@/modules/dashboard";
import { UserInitialValues } from "@/modules/UserInitialValue";
import { Navigate, Route, Routes } from "react-router";

const AdminRouter = () => {
  return (
    <Routes>
      <Route index element={<Navigate to="/admin" />} />
      <Route path="/dashboard" element={<Navigate to="/admin/dashboard" />} />
      <Route path="/admin" element={<DefaultLayout />}>
        <Route index element={<Navigate to="/admin/dashboard" />} />

        {/* <Route
          path="profile"
          element={<Profile />}
        /> */}
        <Route path="dashboard" element={<Dashboard />} />
        {/* <Route path="riders" element={<Riders />} />
        <Route path="vehicles" element={<Vehicles />} />
        <Route path="fees">
          <Route index element={<Fees />} />
          <Route path="collection" element={<CreateFee />} />
        </Route>
        <Route path="expenses">
          <Route index element={<Expenses />} />
          <Route path="process" element={<CreateExpense />} />
          <Route path="process/:id" element={<EditExpense />} />
        </Route>
        <Route path="reports">
          <Route index element={<Reports />} />
          <Route path="income_reports" element={<IncomeReport />} />
          <Route path="expense_reports" element={<ExpenseReport />} />
          <Route path="daily_collection_reports" element={<DailyCollectionReport />} />
          <Route path="monthly_collection_reports" element={<MonthlyCollectionReport />} />
        </Route>

        <Route path="settings">
          <Route index element={<Settings />} />
          <Route path="Organizations" element={<Organizations />} />
          <Route path="schools" element={<Schools />} />
          <Route path="riders" element={<Riders />} />
          <Route path="vehicles" element={<Vehicles />} />
          <Route path="time_slots" element={<Slots />} />

          <Route path="designations" element={<Designations />} />


          <Route path="fiscal_years" element={<FiscalYears />} />
          <Route path="income_groups" element={<IncomeGroups />} />
          <Route path="fee_heads" element={<FeeHeads />} />

          <Route path='expense_groups' element={<ExpenseGroups />} />
          <Route path='expense_heads' element={<ExpenseHeads />} /> */}

        {/* <Route path='expense_groups' element={<ExpenseGroups />} />
                    <Route path='fee_heads' element={<FeeHeads />} />
                    <Route path='fee_templates' element={<FeeTemplates />} />

                    <Route path='documents' element={<Documents />} /> */}
        <Route path="user_initial_values" element={<UserInitialValues />} />
        <Route path="key_values" element={<div />} />
      </Route>


      <Route path="*" element={<Navigate to="/dashboard" />} />

      {/* <Route path="*" element={<Navigate to="/admin/dashboard" />} /> */}
    </Routes >
  );
};

export default AdminRouter;

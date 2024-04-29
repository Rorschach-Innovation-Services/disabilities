import { Request, Response } from "express";
import { generateGroupReport } from "../../utilities/group-report";
import { Readable } from "stream";
import { fetchPDFData } from "../../utilities/pdf-data";
import { Company, Department } from "../../models";

/**
 * Retrieve all assessments
 * @param request object
 * @param response object
 * @returns response
 */
export const createGroupReport = async (
  request: Request,
  response: Response
) => {
  try {
    const { departmentId } = request.params;
    const department = await Department.findById(departmentId)
      .where("deleted")
      .equals(false)
      .populate("assessments")
      .populate("assessments.employee")
      .populate("company");

    if (department === null)
      return response
        .status(400)
        .json({ message: "Department does not exist." });

    const data = await fetchPDFData(department);
    const pdf = await generateGroupReport(data);

    response.contentType("application/pdf");
    response.attachment();

    const stream = Readable.from(pdf);
    stream.pipe(response);
  } catch (error) {
    console.log("error", error);
    return response.status(500).json({ message: "Internal Server Error" });
  }
};

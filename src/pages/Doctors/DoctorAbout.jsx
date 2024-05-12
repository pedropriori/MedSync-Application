import { formateDate } from "../../utils/formateDate";

const DoctorAbout = ({ name, about, qualifications, experiences }) => {
  return (
    <div>
      <div>
        <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold flex items-center gap-2">
          Sobre
          <span className="text-irisBlueColor font-bold text-[22px] leading-9">
            Paulo Roberto
          </span>
        </h3>
        <p className="text__para text-[16px]">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt
          praesentium repellat voluptates nesciunt, quia itaque a quae quam
          dolore labore mollitia debitis aliquam porro in voluptate laborum ipsa
          voluptatibus voluptatum adipisci corrupti molestiae id nostrum vitae!
          Dolorum, error? Adipisci explicabo quo velit assumenda vel praesentium
          soluta eaque. Nulla, tempora molestiae.
        </p>
      </div>
      <div className="mt-12">
        <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold">
          Educação
        </h3>

        <ul className="pt-4">
          <li className="flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]">
            <div>
              <span className="text-irisBlueColor text-[15px] leading-6 font-semibold ">
                {formateDate("09-13-2018")} - {formateDate("03-13-2024")}
              </span>
              <p className="text-[15px] leading-6 font-medium text-textColor">
                PHD em Neurologia
              </p>
            </div>
            <p className="text-[14px] leading-5 font-medium text-textColor">
              Centro Universitário Integrado, Campo Mourão - PR.
            </p>
          </li>

          <li className="flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]">
            <div>
              <span className="text-irisBlueColor text-[15px] leading-6 font-semibold ">
                {formateDate("07-04-2010")} - {formateDate("09-13-2015")}
              </span>
              <p className="text-[15px] leading-6 font-medium text-textColor">
                Bacharelado em Medicina
              </p>
            </div>
            <p className="text-[14px] leading-5 font-medium text-textColor">
              Centro Universitário Integrado, Campo Mourão - PR.
            </p>
          </li>
        </ul>
      </div>

      <div className="mt-12">
        <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold">
          Experiência
        </h3>

        <ul className="grid sm:grid-cols-2 gap-[30px] pt-4 md:p-5">
          <li className="p-4 rounded bg-[#fff9ea]">
            <span className="text-yellowColor text-[15px] leading-6 font-semibold">
              {formateDate("07-04-2010")} - {formateDate("09-13-2014")}
            </span>
            <p className="text-[16px] leading-6 font-medium text-textColor">
              Neurologista
            </p>

            <p className="text-[14px] leading-5 font-medium text-textColor">
              Hospital Santa Casa, Campo Mourão - PR.
            </p>
          </li>

          <li className="p-4 rounded bg-[#fff9ea]">
            <span className="text-yellowColor text-[15px] leading-6 font-semibold">
              {formateDate("07-04-2010")} - {formateDate("09-13-2014")}
            </span>
            <p className="text-[16px] leading-6 font-medium text-textColor">
              Neurologista
            </p>

            <p className="text-[14px] leading-5 font-medium text-textColor">
              Hospital Santa Casa, Campo Mourão - PR.
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DoctorAbout;

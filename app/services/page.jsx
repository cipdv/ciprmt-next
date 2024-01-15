
const Services = () => {
    return (
      <div>
          <h5 className="head_text text-center">Services</h5>
          <table className="table-fixed mt-5">
                  <thead>
                      <tr>
                          <th>Duration</th>
                          <th >Price</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr>
                          <td className="pr-7">60 minute Massage</td>
                          <td>$115</td>
                      </tr>
                      <tr>
                          <td>75 minute Massage</td>
                          <td>$135</td>
                      </tr>
                      <tr>
                          <td>90 minute Massage</td>
                          <td>$155</td>
                      </tr>
                  </tbody>
              </table>
              <div className="pt-5">
                  *All prices include HST
              </div>
      </div>
    )
  }
  
  export default Services
var oracledb = require('oracledb');
class DataBase{


    constructor(page)
        {
           this.page=page;
          
        }
async connect(username, password, connectionstring){
    try {
        var connection = await oracledb.getConnection({
            user: username,
            password: password,
            connectString: connectionstring
        });
        console.log("Successfully connected to Oracle!")
        return connection
    } catch (err) {
        console.log("Error: ", err);
    }
 
}
    async executequery(dbconnection, query){
        try {

            var result = await dbconnection.execute(query);
            return result
        } catch (err) {

            console.log("Error when closing the database connection: ", err);
        }
    };

        async close(connection){
            try {
                await connection.close();
                console.log("DB Connection Has Been Closed")
            } catch (err) {
    
                console.log("Error when closing the database connection: ", err);
            }
        };
        async getSearchResults(dr_address,value){
            var list="SELECT COUNT (*) FROM (  SELECT * FROM TE_ESTIMATE INNER JOIN ES_REVENUE_STREAM RS ON REVENUE_STREAM_ID = RS.REV_STREAM_ID  WHERE ESTIMATE_VERSION IS NOT NULL AND dr_Address_id ='" + dr_address +"' AND RS.WORKSIGHT_IND = 'Y' ORDER BY BID_DATE DESC NULLS LAST) WHERE LOWER(CRM_OPPORTUNITY_ID) LIKE '%"+value+"%' OR LOWER(ESTIMATE_ID) LIKE '%"+value+"%' OR LOWER(PROJECT_NAME) LIKE '%"+value+"%'"; 
     
            return list;
        }
        async setProcedure(value){
            var procedure= "begin so.p_set_dr_address_ctx("+value+");end;"
            return procedure;
        }

};
    module.exports = {DataBase};
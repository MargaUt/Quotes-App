package lt.quotes;

import com.jayway.restassured.RestAssured;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.boot.test.context.SpringBootTest;
import static com.jayway.restassured.RestAssured.when;
import static org.hamcrest.CoreMatchers.is;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = QuotesApp.class, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class AppTestsQuotes {

	private static String NOT_LOGGED_IN = "Not logged";

	private static String ERROR_MESSAGE = "Error : You can only perform this action when you are logged in.";

	@Value("${local.server.port}")
	int port;

	@Before
	public void setUp() throws Exception {
		RestAssured.port = port;
	}

	@Test
	public void testNotLogged() throws Exception {
		when().get("/api/user/loggedUsername").then().statusCode(200).body(is(NOT_LOGGED_IN));
	}

	@Test
	public void testForbidden() throws Exception {
		when().get("/api/user").then().statusCode(401).body(is(ERROR_MESSAGE));
	}
}

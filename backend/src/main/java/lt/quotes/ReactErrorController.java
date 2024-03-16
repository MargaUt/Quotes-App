package lt.quotes;

import java.nio.charset.StandardCharsets;

import javax.servlet.RequestDispatcher;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
public class ReactErrorController implements ErrorController {

	private static String ERROR = "Error";

	@Value("classpath:public/index.html")
	private Resource index;

	@RequestMapping("/error")
	public ResponseEntity<Resource> index(HttpServletRequest request) {
		Object status = request.getAttribute(RequestDispatcher.ERROR_STATUS_CODE);

		if (status != null) {
			Integer statusCode = Integer.valueOf(status.toString());
			log.error("Error occured " + statusCode);
			if (statusCode == HttpStatus.UNAUTHORIZED.value() || statusCode == HttpStatus.FORBIDDEN.value()
					|| statusCode == HttpStatus.INTERNAL_SERVER_ERROR.value()) {
				var body = ERROR;
				if (statusCode == HttpStatus.UNAUTHORIZED.value()) {
					body = "The action can be performed when logged in.";
				}
				if (statusCode == HttpStatus.FORBIDDEN.value()) {
					body = "The action cannot be performed with the current role.";
				}
				Resource resursas = new ByteArrayResource(
						("{\"Error\": \"" + body + "\"}").getBytes(StandardCharsets.UTF_8));
				return ResponseEntity.status(HttpStatus.valueOf(statusCode)).body(resursas);
			}
		}
		return ResponseEntity.ok(index);
	}

	@Override
	public String getErrorPath() {
		return null;
	}
}
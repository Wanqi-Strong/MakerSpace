package com.makerspace;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.core.env.Environment;

import java.net.InetAddress;
import java.net.UnknownHostException;

@SpringBootApplication
public class MakerspaceBackendSpringbootApplication {

	private static String path;

	public static void main(String[] args) throws UnknownHostException {
		ConfigurableApplicationContext application =SpringApplication.run(MakerspaceBackendSpringbootApplication.class, args);
		Environment env = application.getEnvironment();
		String ip = InetAddress.getLocalHost().getHostAddress();
		String port = env.getProperty("server.port");
		String property = env.getProperty("server.servlet.context-path");
		String ath = property == null ? "" :  property;
		System.out.println(
				"\n\t" +
						"----------------------------------------------------------\n\t" +
						"Application MakerSpace is running :) Access URLs:\n\t" +
						"Local: \t\thttp://localhost:" + port + path + "/\n\t" +
						"External: \thttp://" + ip + ":" + port + path + "/\n\t" +
						"------------------------------------------------------------");
	}

}
